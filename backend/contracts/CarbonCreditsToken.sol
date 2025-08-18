// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonCreditsToken
 * @dev ERC20 token representing carbon credits for climate projects
 */
contract CarbonCreditsToken is ERC20, Ownable {
    
    struct Project {
        string projectId;
        string projectType;
        uint256 totalCredits;
        bool isActive;
    }
    
    mapping(string => Project) public projects;
    mapping(address => mapping(string => uint256)) public userProjectCredits;
    
    event CarbonCreditsMinted(
        address indexed to,
        uint256 amount,
        string projectId
    );
    
    event CarbonCreditsBurned(
        address indexed from,
        uint256 amount,
        string reason
    );
    
    event ProjectRegistered(
        string indexed projectId,
        string projectType
    );
    
    constructor() ERC20("Carbon Credits", "CCR") Ownable(msg.sender) {
        // Initial supply can be 0, credits are minted as projects generate them
    }
    
    /**
     * @dev Register a new carbon credit project
     * @param projectId Unique identifier for the project
     * @param projectType Type of project (e.g., "Reforestation", "Renewable Energy")
     */
    function registerProject(
        string memory projectId,
        string memory projectType
    ) public onlyOwner {
        require(bytes(projects[projectId].projectId).length == 0, "Project already exists");
        
        projects[projectId] = Project({
            projectId: projectId,
            projectType: projectType,
            totalCredits: 0,
            isActive: true
        });
        
        emit ProjectRegistered(projectId, projectType);
    }
    
    /**
     * @dev Mint carbon credits for a specific project
     * @param to Address to receive the credits
     * @param amount Amount of credits to mint
     * @param projectId Project generating the credits
     */
    function mintCarbonCredits(
        address to,
        uint256 amount,
        string memory projectId
    ) public onlyOwner {
        require(projects[projectId].isActive, "Project is not active");
        require(amount > 0, "Amount must be greater than 0");
        
        _mint(to, amount);
        projects[projectId].totalCredits += amount;
        userProjectCredits[to][projectId] += amount;
        
        emit CarbonCreditsMinted(to, amount, projectId);
    }
    
    /**
     * @dev Burn carbon credits (retire them)
     * @param amount Amount of credits to burn
     * @param reason Reason for burning credits
     */
    function burnCarbonCredits(uint256 amount, string memory reason) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        
        emit CarbonCreditsBurned(msg.sender, amount, reason);
    }
    
    /**
     * @dev Get project information
     * @param projectId The project identifier
     * @return projectType, totalCredits, isActive
     */
    function getProject(string memory projectId) 
        public 
        view 
        returns (string memory, uint256, bool) 
    {
        Project memory project = projects[projectId];
        return (project.projectType, project.totalCredits, project.isActive);
    }
    
    /**
     * @dev Deactivate a project
     * @param projectId The project to deactivate
     */
    function deactivateProject(string memory projectId) public onlyOwner {
        projects[projectId].isActive = false;
    }
    
    /**
     * @dev Get user's credits for a specific project
     * @param user User address
     * @param projectId Project identifier
     * @return Amount of credits from that project
     */
    function getUserProjectCredits(address user, string memory projectId) 
        public 
        view 
        returns (uint256) 
    {
        return userProjectCredits[user][projectId];
    }
}
