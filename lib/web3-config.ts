import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, polygonMumbai, arbitrum, optimism } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// Project ID for WalletConnect
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your_project_id_here'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, polygonMumbai, arbitrum, optimism],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'EcoChain Climate Platform',
      appLogoUrl: 'https://your-domain.com/logo.png',
    }),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'EcoChain Climate Platform',
        description: 'Web3-powered climate action platform',
        url: 'https://your-domain.com',
        icons: ['https://your-domain.com/logo.png']
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
})

// Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  // Mainnet contracts
  [mainnet.id]: {
    CLIMATE_DATA: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    CARBON_CREDITS: '0x1234567890123456789012345678901234567890',
    ENVIRONMENTAL_NFT: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    PROJECT_FUNDING: '0x9876543210987654321098765432109876543210',
  },
  // Sepolia testnet contracts
  [sepolia.id]: {
    CLIMATE_DATA: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    CARBON_CREDITS: '0x1234567890123456789012345678901234567890',
    ENVIRONMENTAL_NFT: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    PROJECT_FUNDING: '0x9876543210987654321098765432109876543210',
  },
  // Polygon contracts
  [polygon.id]: {
    CLIMATE_DATA: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    CARBON_CREDITS: '0x1234567890123456789012345678901234567890',
    ENVIRONMENTAL_NFT: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    PROJECT_FUNDING: '0x9876543210987654321098765432109876543210',
  },
  // Mumbai testnet contracts
  [polygonMumbai.id]: {
    CLIMATE_DATA: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    CARBON_CREDITS: '0x1234567890123456789012345678901234567890',
    ENVIRONMENTAL_NFT: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    PROJECT_FUNDING: '0x9876543210987654321098765432109876543210',
  },
}

// Supported tokens for payments
export const SUPPORTED_TOKENS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    addresses: {
      [mainnet.id]: '0x0000000000000000000000000000000000000000', // Native ETH
      [sepolia.id]: '0x0000000000000000000000000000000000000000',
    }
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    addresses: {
      [mainnet.id]: '0xA0b86a33E6441E4cE6C7D55E9c0C0c9B11E4F9e8',
      [sepolia.id]: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      [polygon.id]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      [polygonMumbai.id]: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
    }
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    addresses: {
      [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      [polygon.id]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    }
  },
  MATIC: {
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    addresses: {
      [mainnet.id]: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      [polygon.id]: '0x0000000000000000000000000000000000000000', // Native MATIC
      [polygonMumbai.id]: '0x0000000000000000000000000000000000000000',
    }
  }
}

// Chain configurations
export const CHAIN_CONFIG = {
  [mainnet.id]: {
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
  },
  [sepolia.id]: {
    name: 'Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
  },
  [polygon.id]: {
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
  },
  [polygonMumbai.id]: {
    name: 'Polygon Mumbai',
    currency: 'MATIC',
    explorerUrl: 'https://mumbai.polygonscan.com',
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
  },
}

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}