import { Router, Request, Response } from 'express';
import { BlockchainService } from '../services/blockchain-service';

const router = Router();

// Initialize blockchain service (default to Sepolia testnet for development)
const blockchainService = new BlockchainService('sepolia');

// Get ETH balance for an address
router.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Ethereum address format'
      });
    }

    const balance = await blockchainService.getEthBalance(address);
    
    res.json({
      success: true,
      data: {
        address,
        balance: `${balance} ETH`,
        network: 'Sepolia Testnet'
      }
    });
  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get balance',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Get network information
router.get('/network', async (req: Request, res: Response) => {
  try {
    const networkInfo = await blockchainService.getNetworkInfo();
    
    res.json({
      success: true,
      data: networkInfo
    });
  } catch (error) {
    console.error('Error getting network info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get network info',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Store climate data on blockchain
router.post('/climate-data', async (req: Request, res: Response) => {
  try {
    const { location, temperature, humidity } = req.body;
    
    if (!location || typeof temperature !== 'number' || typeof humidity !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: location, temperature, humidity'
      });
    }

    const result = await blockchainService.storeClimateData(location, temperature, humidity);
    
    res.json({
      success: true,
      message: 'Climate data stored on blockchain successfully',
      data: result
    });
  } catch (error) {
    console.error('Error storing climate data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to store climate data on blockchain',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Get climate data from blockchain
router.get('/climate-data/:index', async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const dataIndex = parseInt(index);
    
    if (isNaN(dataIndex) || dataIndex < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid index parameter'
      });
    }

    const result = await blockchainService.getClimateData(dataIndex);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting climate data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get climate data from blockchain',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Mint carbon credits
router.post('/carbon-credits/mint', async (req: Request, res: Response) => {
  try {
    const { recipient, amount, projectId } = req.body;
    
    if (!recipient || !amount || !projectId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: recipient, amount, projectId'
      });
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipient address format'
      });
    }

    const result = await blockchainService.mintCarbonCredits(recipient, amount, projectId);
    
    res.json({
      success: true,
      message: 'Carbon credits minted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error minting carbon credits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mint carbon credits',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Get carbon credit balance
router.get('/carbon-credits/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Ethereum address format'
      });
    }

    const balance = await blockchainService.getCarbonCreditBalance(address);
    
    res.json({
      success: true,
      data: {
        address,
        balance: `${balance} Carbon Credits`,
        network: 'Sepolia Testnet'
      }
    });
  } catch (error) {
    console.error('Error getting carbon credit balance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get carbon credit balance',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Mint environmental NFT
router.post('/nft/mint', async (req: Request, res: Response) => {
  try {
    const { recipient, tokenURI, projectType } = req.body;
    
    if (!recipient || !tokenURI || !projectType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: recipient, tokenURI, projectType'
      });
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipient address format'
      });
    }

    const result = await blockchainService.mintEnvironmentalNFT(recipient, tokenURI, projectType);
    
    res.json({
      success: true,
      message: 'Environmental NFT minted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error minting environmental NFT:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mint environmental NFT',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Verify transaction
router.get('/transaction/:txHash', async (req: Request, res: Response) => {
  try {
    const { txHash } = req.params;
    
    if (!txHash || !/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction hash format'
      });
    }

    const result = await blockchainService.verifyTransaction(txHash);
    
    res.json({
      success: true,
      data: {
        txHash,
        ...result
      }
    });
  } catch (error) {
    console.error('Error verifying transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify transaction',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Health check for blockchain service
router.get('/health', async (req: Request, res: Response) => {
  try {
    const networkInfo = await blockchainService.getNetworkInfo();
    
    res.json({
      success: true,
      message: 'Blockchain service is healthy',
      data: {
        status: 'connected',
        network: networkInfo.name,
        chainId: networkInfo.chainId,
        latestBlock: networkInfo.blockNumber,
        gasPrice: `${networkInfo.gasPrice} gwei`
      }
    });
  } catch (error) {
    console.error('Blockchain health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'Blockchain service is unhealthy',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

export default router;
