import { ethers } from 'ethers';
import { 
  getProvider, 
  getWallet, 
  BLOCKCHAIN_CONFIG, 
  CLIMATE_DATA_ABI, 
  CARBON_CREDITS_ABI, 
  ENVIRONMENTAL_NFT_ABI 
} from '../config/blockchain-config';

export interface ClimateDataRecord {
  id: number;
  location: string;
  temperature: number;
  humidity: number;
  timestamp: number;
  txHash?: string;
}

export interface CarbonCredit {
  amount: number;
  projectId: string;
  recipient: string;
  txHash?: string;
}

export interface EnvironmentalNFT {
  tokenId: number;
  recipient: string;
  projectType: string;
  tokenURI: string;
  txHash?: string;
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet?: ethers.Wallet;
  private network: 'mainnet' | 'sepolia' | 'polygon';
  private hasWallet: boolean;

  constructor(network: 'mainnet' | 'sepolia' | 'polygon' = 'sepolia') {
    this.network = network;
    this.provider = getProvider(network);
    
    try {
      this.wallet = getWallet(network);
      this.hasWallet = true;
    } catch (error) {
      console.warn('Blockchain wallet not configured, write operations will not be available');
      this.hasWallet = false;
    }
  }

  // Get ETH balance for an address
  async getEthBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting ETH balance:', error);
      throw new Error(`Failed to get ETH balance: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Get current gas price
  async getCurrentGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.provider.getFeeData();
      return ethers.formatUnits(gasPrice.gasPrice || 0, 'gwei');
    } catch (error) {
      console.error('Error getting gas price:', error);
      throw new Error(`Failed to get gas price: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Store climate data on blockchain
  async storeClimateData(location: string, temperature: number, humidity: number): Promise<ClimateDataRecord> {
    if (!this.hasWallet || !this.wallet) {
      throw new Error('Blockchain wallet not configured. Please set BLOCKCHAIN_PRIVATE_KEY environment variable.');
    }
    
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACTS.CLIMATE_DATA,
        CLIMATE_DATA_ABI,
        this.wallet
      );

      const timestamp = Math.floor(Date.now() / 1000);
      
      // Convert temperature and humidity to integers (multiply by 100 to preserve 2 decimal places)
      const tempInt = Math.round(temperature * 100);
      const humidityInt = Math.round(humidity * 100);

      const tx = await contract.storeClimateData(location, tempInt, humidityInt, timestamp);
      await tx.wait();

      // Get the count to determine the ID
      const count = await contract.getClimateDataCount();
      const id = Number(count) - 1;

      return {
        id,
        location,
        temperature,
        humidity,
        timestamp,
        txHash: tx.hash
      };
    } catch (error) {
      console.error('Error storing climate data on blockchain:', error);
      throw new Error(`Failed to store climate data: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Retrieve climate data from blockchain
  async getClimateData(index: number): Promise<ClimateDataRecord> {
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACTS.CLIMATE_DATA,
        CLIMATE_DATA_ABI,
        this.provider
      );

      const [location, tempInt, humidityInt, timestamp] = await contract.getClimateData(index);
      
      // Convert back from integers to decimals
      const temperature = Number(tempInt) / 100;
      const humidity = Number(humidityInt) / 100;

      return {
        id: index,
        location,
        temperature,
        humidity,
        timestamp: Number(timestamp)
      };
    } catch (error) {
      console.error('Error getting climate data from blockchain:', error);
      throw new Error(`Failed to get climate data: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Mint carbon credits
  async mintCarbonCredits(recipient: string, amount: number, projectId: string): Promise<CarbonCredit> {
    if (!this.hasWallet || !this.wallet) {
      throw new Error('Blockchain wallet not configured. Please set BLOCKCHAIN_PRIVATE_KEY environment variable.');
    }
    
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACTS.CARBON_CREDITS,
        CARBON_CREDITS_ABI,
        this.wallet
      );

      // Convert amount to wei (18 decimals)
      const amountWei = ethers.parseEther(amount.toString());
      
      const tx = await contract.mintCarbonCredits(recipient, amountWei, projectId);
      await tx.wait();

      return {
        amount,
        projectId,
        recipient,
        txHash: tx.hash
      };
    } catch (error) {
      console.error('Error minting carbon credits:', error);
      throw new Error(`Failed to mint carbon credits: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Get carbon credit balance
  async getCarbonCreditBalance(address: string): Promise<string> {
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACTS.CARBON_CREDITS,
        CARBON_CREDITS_ABI,
        this.provider
      );

      const balance = await contract.balanceOf(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting carbon credit balance:', error);
      throw new Error(`Failed to get carbon credit balance: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Mint environmental NFT
  async mintEnvironmentalNFT(
    recipient: string, 
    tokenURI: string, 
    projectType: string
  ): Promise<EnvironmentalNFT> {
    if (!this.hasWallet || !this.wallet) {
      throw new Error('Blockchain wallet not configured. Please set BLOCKCHAIN_PRIVATE_KEY environment variable.');
    }
    
    try {
      const contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACTS.ENVIRONMENTAL_NFT,
        ENVIRONMENTAL_NFT_ABI,
        this.wallet
      );

      const tx = await contract.mintEnvironmentalNFT(recipient, tokenURI, projectType);
      const receipt = await tx.wait();

      // Extract tokenId from the transaction logs
      const tokenId = receipt.logs[0]?.args?.[2] || 0;

      return {
        tokenId: Number(tokenId),
        recipient,
        projectType,
        tokenURI,
        txHash: tx.hash
      };
    } catch (error) {
      console.error('Error minting environmental NFT:', error);
      throw new Error(`Failed to mint environmental NFT: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Get network information
  async getNetworkInfo(): Promise<{
    chainId: number;
    name: string;
    blockNumber: number;
    gasPrice: string;
  }> {
    try {
      const network = await this.provider.getNetwork();
      const blockNumber = await this.provider.getBlockNumber();
      const gasPrice = await this.getCurrentGasPrice();

      return {
        chainId: Number(network.chainId),
        name: network.name,
        blockNumber,
        gasPrice
      };
    } catch (error) {
      console.error('Error getting network info:', error);
      throw new Error(`Failed to get network info: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }

  // Verify transaction
  async verifyTransaction(txHash: string): Promise<{
    confirmed: boolean;
    blockNumber?: number;
    gasUsed?: string;
    status?: number;
  }> {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      
      if (!receipt) {
        return { confirmed: false };
      }

      return {
        confirmed: true,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status || undefined
      };
    } catch (error) {
      console.error('Error verifying transaction:', error);
      throw new Error(`Failed to verify transaction: ${(error as Error)?.message || 'Unknown error'}`);
    }
  }
}
