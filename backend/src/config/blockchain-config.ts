import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// Blockchain Configuration
export const BLOCKCHAIN_CONFIG = {
  // Ethereum Network Configuration
  ETHEREUM: {
    MAINNET_RPC: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    SEPOLIA_RPC: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    POLYGON_RPC: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    CHAIN_IDS: {
      MAINNET: 1,
      SEPOLIA: 11155111,
      POLYGON: 137
    }
  },
  
  // Climate Smart Contract Addresses
  CONTRACTS: {
    CLIMATE_DATA: process.env.CLIMATE_DATA_CONTRACT || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    CARBON_CREDITS: process.env.CARBON_CREDITS_CONTRACT || '0x1234567890123456789012345678901234567890',
    ENVIRONMENTAL_NFT: process.env.ENVIRONMENTAL_NFT_CONTRACT || '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
  },

  // Private Keys (for transaction signing)
  PRIVATE_KEY: process.env.BLOCKCHAIN_PRIVATE_KEY || '',
  
  // Gas Configuration
  GAS: {
    LIMIT: 21000,
    PRICE: ethers.parseUnits('20', 'gwei')
  }
};

// Network Provider Factory
export function getProvider(network: 'mainnet' | 'sepolia' | 'polygon' = 'sepolia'): ethers.JsonRpcProvider {
  let rpcUrl: string;
  
  switch (network) {
    case 'mainnet':
      rpcUrl = BLOCKCHAIN_CONFIG.ETHEREUM.MAINNET_RPC;
      break;
    case 'polygon':
      rpcUrl = BLOCKCHAIN_CONFIG.ETHEREUM.POLYGON_RPC;
      break;
    case 'sepolia':
    default:
      rpcUrl = BLOCKCHAIN_CONFIG.ETHEREUM.SEPOLIA_RPC;
      break;
  }
  
  return new ethers.JsonRpcProvider(rpcUrl);
}

// Wallet Factory
export function getWallet(network: 'mainnet' | 'sepolia' | 'polygon' = 'sepolia'): ethers.Wallet {
  const privateKey = BLOCKCHAIN_CONFIG.PRIVATE_KEY;
  
  if (!privateKey || privateKey === '') {
    throw new Error('BLOCKCHAIN_PRIVATE_KEY environment variable is required');
  }
  
  const provider = getProvider(network);
  return new ethers.Wallet(privateKey, provider);
}

// Climate Data Smart Contract ABI (example)
export const CLIMATE_DATA_ABI = [
  "function storeClimateData(string memory location, uint256 temperature, uint256 humidity, uint256 timestamp) public",
  "function getClimateData(uint256 index) public view returns (string memory, uint256, uint256, uint256)",
  "function getClimateDataCount() public view returns (uint256)",
  "event ClimateDataStored(uint256 indexed index, string location, uint256 temperature, uint256 humidity, uint256 timestamp)"
];

// Carbon Credits Contract ABI
export const CARBON_CREDITS_ABI = [
  "function mintCarbonCredits(address to, uint256 amount, string memory projectId) public",
  "function burnCarbonCredits(uint256 amount) public",
  "function balanceOf(address owner) public view returns (uint256)",
  "function transfer(address to, uint256 amount) public returns (bool)",
  "event CarbonCreditsMinted(address indexed to, uint256 amount, string projectId)",
  "event CarbonCreditsBurned(address indexed from, uint256 amount)"
];

// Environmental NFT Contract ABI
export const ENVIRONMENTAL_NFT_ABI = [
  "function mintEnvironmentalNFT(address to, string memory tokenURI, string memory projectType) public returns (uint256)",
  "function getProjectType(uint256 tokenId) public view returns (string memory)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "event EnvironmentalNFTMinted(address indexed to, uint256 indexed tokenId, string projectType)"
];
