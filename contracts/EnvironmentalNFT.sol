// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title EnvironmentalNFT
 * @dev NFT contract for environmental certificates and badges
 */
contract EnvironmentalNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable, Pausable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Certificate {
        uint256 tokenId;
        string certificateType; // "CARBON_OFFSET", "TREE_PLANTING", "OCEAN_CLEANUP", etc.
        string title;
        string description;
        address recipient;
        uint256 projectId;
        uint256 impactValue; // Trees planted, CO2 offset, etc.
        string impactUnit; // "trees", "kg CO2", "kg plastic", etc.
        uint256 issuedAt;
        address issuer;
        bool verified;
    }

    struct Badge {
        string name;
        string description;
        string imageUri;
        uint256 requiredImpact;
        string impactType;
        bool active;
    }

    // State variables
    mapping(uint256 => Certificate) public certificates;
    mapping(string => Badge) public badges;
    mapping(address => string[]) public userBadges;
    mapping(address => uint256[]) public userCertificates;
    mapping(address => bool) public authorizedIssuers;
    mapping(string => bool) public badgeExists;
    
    string[] public availableBadges;
    
    // Events
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string certificateType,
        uint256 projectId,
        uint256 impactValue
    );
    
    event BadgeCreated(string indexed badgeName, uint256 requiredImpact);
    event BadgeAwarded(address indexed recipient, string indexed badgeName);
    event CertificateVerified(uint256 indexed tokenId, address verifier);
    event IssuerAuthorized(address indexed issuer, bool authorized);

    constructor() ERC721("EcoChain Environmental Certificate", "ECOENFT") {
        // Create initial badges
        _createBadge("Climate Advocate", "Awarded for significant environmental contributions", "", 1000, "general");
        _createBadge("Tree Planter", "Awarded for tree planting activities", "", 100, "trees");
        _createBadge("Ocean Guardian", "Awarded for ocean cleanup contributions", "", 50, "kg_plastic");
        _createBadge("Carbon Fighter", "Awarded for carbon offset achievements", "", 1000, "kg_co2");
        _createBadge("Green Pioneer", "Awarded for pioneering environmental projects", "", 5000, "general");
    }

    /**
     * @dev Issue an environmental certificate
     */
    function issueCertificate(
        address _recipient,
        string memory _certificateType,
        string memory _title,
        string memory _description,
        uint256 _projectId,
        uint256 _impactValue,
        string memory _impactUnit,
        string memory _tokenUri
    ) external whenNotPaused returns (uint256) {
        require(authorizedIssuers[msg.sender] || msg.sender == owner(), "Not authorized to issue certificates");
        require(_recipient != address(0), "Invalid recipient address");
        require(bytes(_certificateType).length > 0, "Certificate type required");
        require(_impactValue > 0, "Impact value must be greater than 0");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenUri);

        certificates[tokenId] = Certificate({
            tokenId: tokenId,
            certificateType: _certificateType,
            title: _title,
            description: _description,
            recipient: _recipient,
            projectId: _projectId,
            impactValue: _impactValue,
            impactUnit: _impactUnit,
            issuedAt: block.timestamp,
            issuer: msg.sender,
            verified: msg.sender == owner() // Auto-verify if issued by owner
        });

        userCertificates[_recipient].push(tokenId);

        emit CertificateIssued(tokenId, _recipient, _certificateType, _projectId, _impactValue);

        // Check for badge eligibility
        _checkBadgeEligibility(_recipient);

        return tokenId;
    }

    /**
     * @dev Create a new badge type
     */
    function createBadge(
        string memory _name,
        string memory _description,
        string memory _imageUri,
        uint256 _requiredImpact,
        string memory _impactType
    ) external onlyOwner {
        _createBadge(_name, _description, _imageUri, _requiredImpact, _impactType);
    }

    /**
     * @dev Internal function to create a badge
     */
    function _createBadge(
        string memory _name,
        string memory _description,
        string memory _imageUri,
        uint256 _requiredImpact,
        string memory _impactType
    ) internal {
        require(!badgeExists[_name], "Badge already exists");
        
        badges[_name] = Badge({
            name: _name,
            description: _description,
            imageUri: _imageUri,
            requiredImpact: _requiredImpact,
            impactType: _impactType,
            active: true
        });

        badgeExists[_name] = true;
        availableBadges.push(_name);

        emit BadgeCreated(_name, _requiredImpact);
    }

    /**
     * @dev Check badge eligibility for a user
     */
    function _checkBadgeEligibility(address _user) internal {
        for (uint256 i = 0; i < availableBadges.length; i++) {
            string memory badgeName = availableBadges[i];
            Badge memory badge = badges[badgeName];
            
            if (!badge.active) continue;
            if (_hasBadge(_user, badgeName)) continue;

            uint256 userImpact = _calculateUserImpact(_user, badge.impactType);
            
            if (userImpact >= badge.requiredImpact) {
                userBadges[_user].push(badgeName);
                emit BadgeAwarded(_user, badgeName);
            }
        }
    }

    /**
     * @dev Calculate user's total impact for a specific type
     */
    function _calculateUserImpact(address _user, string memory _impactType) internal view returns (uint256) {
        uint256 totalImpact = 0;
        uint256[] memory userTokens = userCertificates[_user];
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            Certificate memory cert = certificates[userTokens[i]];
            if (cert.verified) {
                if (keccak256(bytes(_impactType)) == keccak256(bytes("general")) ||
                    keccak256(bytes(cert.impactUnit)) == keccak256(bytes(_impactType))) {
                    totalImpact += cert.impactValue;
                }
            }
        }
        
        return totalImpact;
    }

    /**
     * @dev Check if user has a specific badge
     */
    function _hasBadge(address _user, string memory _badgeName) internal view returns (bool) {
        string[] memory badges = userBadges[_user];
        for (uint256 i = 0; i < badges.length; i++) {
            if (keccak256(bytes(badges[i])) == keccak256(bytes(_badgeName))) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Verify a certificate (only owner or authorized issuer)
     */
    function verifyCertificate(uint256 _tokenId) external {
        require(_exists(_tokenId), "Certificate does not exist");
        require(authorizedIssuers[msg.sender] || msg.sender == owner(), "Not authorized to verify");
        
        certificates[_tokenId].verified = true;
        emit CertificateVerified(_tokenId, msg.sender);
        
        // Recheck badge eligibility after verification
        _checkBadgeEligibility(certificates[_tokenId].recipient);
    }

    /**
     * @dev Authorize/deauthorize certificate issuer
     */
    function authorizeIssuer(address _issuer, bool _authorized) external onlyOwner {
        authorizedIssuers[_issuer] = _authorized;
        emit IssuerAuthorized(_issuer, _authorized);
    }

    /**
     * @dev Get certificate details
     */
    function getCertificate(uint256 _tokenId) external view returns (Certificate memory) {
        require(_exists(_tokenId), "Certificate does not exist");
        return certificates[_tokenId];
    }

    /**
     * @dev Get user's certificates
     */
    function getUserCertificates(address _user) external view returns (uint256[] memory) {
        return userCertificates[_user];
    }

    /**
     * @dev Get user's badges
     */
    function getUserBadges(address _user) external view returns (string[] memory) {
        return userBadges[_user];
    }

    /**
     * @dev Get user's impact statistics
     */
    function getUserImpactStats(address _user) external view returns (
        uint256 totalCertificates,
        uint256 totalBadges,
        uint256 treesPlanted,
        uint256 co2Offset,
        uint256 plasticCleaned
    ) {
        totalCertificates = userCertificates[_user].length;
        totalBadges = userBadges[_user].length;
        treesPlanted = _calculateUserImpact(_user, "trees");
        co2Offset = _calculateUserImpact(_user, "kg_co2");
        plasticCleaned = _calculateUserImpact(_user, "kg_plastic");
    }

    /**
     * @dev Get all available badges
     */
    function getAvailableBadges() external view returns (string[] memory) {
        return availableBadges;
    }

    /**
     * @dev Get badge details
     */
    function getBadge(string memory _badgeName) external view returns (Badge memory) {
        require(badgeExists[_badgeName], "Badge does not exist");
        return badges[_badgeName];
    }

    /**
     * @dev Pause contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // Override required functions
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}