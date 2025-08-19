// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ClimateProjectFunding
 * @dev Smart contract for funding climate projects with cryptocurrency
 */
contract ClimateProjectFunding is ReentrancyGuard, Ownable, Pausable {
    struct Project {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 goalAmount;
        uint256 currentAmount;
        uint256 deadline;
        bool completed;
        bool approved;
        string category;
        string location;
        uint256 createdAt;
    }

    struct Contribution {
        address contributor;
        uint256 amount;
        address token;
        uint256 timestamp;
        string message;
    }

    // State variables
    uint256 public projectCounter;
    uint256 public totalProjectsFunded;
    uint256 public totalAmountRaised;
    
    mapping(uint256 => Project) public projects;
    mapping(uint256 => Contribution[]) public projectContributions;
    mapping(address => uint256[]) public userProjects;
    mapping(address => uint256[]) public userContributions;
    mapping(address => bool) public approvedTokens;
    mapping(address => bool) public verifiedCreators;
    
    // Events
    event ProjectCreated(
        uint256 indexed projectId,
        address indexed creator,
        string title,
        uint256 goalAmount,
        uint256 deadline
    );
    
    event ProjectFunded(
        uint256 indexed projectId,
        address indexed contributor,
        uint256 amount,
        address token
    );
    
    event ProjectCompleted(uint256 indexed projectId, uint256 totalRaised);
    event ProjectApproved(uint256 indexed projectId, address approver);
    event CreatorVerified(address indexed creator, address verifier);
    event TokenApproved(address indexed token, bool approved);
    
    // Modifiers
    modifier projectExists(uint256 _projectId) {
        require(_projectId > 0 && _projectId <= projectCounter, "Project does not exist");
        _;
    }
    
    modifier onlyProjectCreator(uint256 _projectId) {
        require(projects[_projectId].creator == msg.sender, "Only project creator");
        _;
    }
    
    modifier projectActive(uint256 _projectId) {
        require(!projects[_projectId].completed, "Project already completed");
        require(block.timestamp < projects[_projectId].deadline, "Project deadline passed");
        require(projects[_projectId].approved, "Project not approved");
        _;
    }

    constructor() {
        // Approve ETH (address(0) represents native ETH)
        approvedTokens[address(0)] = true;
    }

    /**
     * @dev Create a new climate project
     */
    function createProject(
        string memory _title,
        string memory _description,
        uint256 _goalAmount,
        uint256 _duration,
        string memory _category,
        string memory _location
    ) external whenNotPaused returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        
        projectCounter++;
        uint256 deadline = block.timestamp + _duration;
        
        projects[projectCounter] = Project({
            id: projectCounter,
            title: _title,
            description: _description,
            creator: msg.sender,
            goalAmount: _goalAmount,
            currentAmount: 0,
            deadline: deadline,
            completed: false,
            approved: verifiedCreators[msg.sender], // Auto-approve if creator is verified
            category: _category,
            location: _location,
            createdAt: block.timestamp
        });
        
        userProjects[msg.sender].push(projectCounter);
        
        emit ProjectCreated(projectCounter, msg.sender, _title, _goalAmount, deadline);
        
        return projectCounter;
    }

    /**
     * @dev Fund a project with ETH
     */
    function fundProjectWithETH(
        uint256 _projectId,
        string memory _message
    ) external payable projectExists(_projectId) projectActive(_projectId) nonReentrant whenNotPaused {
        require(msg.value > 0, "Must send ETH to fund");
        
        Project storage project = projects[_projectId];
        project.currentAmount += msg.value;
        
        // Record contribution
        projectContributions[_projectId].push(Contribution({
            contributor: msg.sender,
            amount: msg.value,
            token: address(0), // ETH
            timestamp: block.timestamp,
            message: _message
        }));
        
        userContributions[msg.sender].push(_projectId);
        totalAmountRaised += msg.value;
        
        emit ProjectFunded(_projectId, msg.sender, msg.value, address(0));
        
        // Check if project goal is reached
        if (project.currentAmount >= project.goalAmount) {
            project.completed = true;
            totalProjectsFunded++;
            emit ProjectCompleted(_projectId, project.currentAmount);
        }
    }

    /**
     * @dev Fund a project with ERC20 tokens
     */
    function fundProjectWithToken(
        uint256 _projectId,
        address _token,
        uint256 _amount,
        string memory _message
    ) external projectExists(_projectId) projectActive(_projectId) nonReentrant whenNotPaused {
        require(approvedTokens[_token], "Token not approved");
        require(_amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(_token);
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        
        Project storage project = projects[_projectId];
        project.currentAmount += _amount;
        
        // Record contribution
        projectContributions[_projectId].push(Contribution({
            contributor: msg.sender,
            amount: _amount,
            token: _token,
            timestamp: block.timestamp,
            message: _message
        }));
        
        userContributions[msg.sender].push(_projectId);
        totalAmountRaised += _amount;
        
        emit ProjectFunded(_projectId, msg.sender, _amount, _token);
        
        // Check if project goal is reached
        if (project.currentAmount >= project.goalAmount) {
            project.completed = true;
            totalProjectsFunded++;
            emit ProjectCompleted(_projectId, project.currentAmount);
        }
    }

    /**
     * @dev Withdraw funds from completed project (only creator)
     */
    function withdrawFunds(uint256 _projectId) 
        external 
        projectExists(_projectId) 
        onlyProjectCreator(_projectId) 
        nonReentrant 
    {
        Project storage project = projects[_projectId];
        require(project.completed || block.timestamp >= project.deadline, "Project not ready for withdrawal");
        require(project.currentAmount > 0, "No funds to withdraw");
        
        uint256 amount = project.currentAmount;
        project.currentAmount = 0;
        
        // Transfer ETH to project creator
        (bool success, ) = payable(project.creator).call{value: amount}("");
        require(success, "ETH transfer failed");
    }

    /**
     * @dev Approve a project (only owner)
     */
    function approveProject(uint256 _projectId) 
        external 
        onlyOwner 
        projectExists(_projectId) 
    {
        projects[_projectId].approved = true;
        emit ProjectApproved(_projectId, msg.sender);
    }

    /**
     * @dev Verify a creator (only owner)
     */
    function verifyCreator(address _creator) external onlyOwner {
        verifiedCreators[_creator] = true;
        emit CreatorVerified(_creator, msg.sender);
    }

    /**
     * @dev Approve a token for funding (only owner)
     */
    function approveToken(address _token, bool _approved) external onlyOwner {
        approvedTokens[_token] = _approved;
        emit TokenApproved(_token, _approved);
    }

    /**
     * @dev Get project details
     */
    function getProject(uint256 _projectId) 
        external 
        view 
        projectExists(_projectId) 
        returns (Project memory) 
    {
        return projects[_projectId];
    }

    /**
     * @dev Get project contributions
     */
    function getProjectContributions(uint256 _projectId) 
        external 
        view 
        projectExists(_projectId) 
        returns (Contribution[] memory) 
    {
        return projectContributions[_projectId];
    }

    /**
     * @dev Get user's projects
     */
    function getUserProjects(address _user) external view returns (uint256[] memory) {
        return userProjects[_user];
    }

    /**
     * @dev Get user's contributions
     */
    function getUserContributions(address _user) external view returns (uint256[] memory) {
        return userContributions[_user];
    }

    /**
     * @dev Get platform statistics
     */
    function getPlatformStats() external view returns (
        uint256 totalProjects,
        uint256 totalFunded,
        uint256 totalRaised
    ) {
        return (projectCounter, totalProjectsFunded, totalAmountRaised);
    }

    /**
     * @dev Emergency pause (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Emergency withdrawal failed");
    }
}