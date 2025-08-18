# Blockchain Integration Documentation

## Overview
The Climate Platform now includes comprehensive blockchain integration using Ethereum and compatible networks. This enables decentralized storage of climate data, carbon credit management, and environmental NFTs.

## 🔗 Blockchain Features

### 1. **Climate Data Storage**
- Store environmental measurements on-chain
- Immutable record of climate data
- Transparent and verifiable data integrity

### 2. **Carbon Credits Management**
- ERC20-based carbon credit tokens
- Mint credits for environmental projects
- Burn credits for carbon offset
- Project-based credit tracking

### 3. **Environmental NFTs**
- Unique tokens for environmental achievements
- Project milestone rewards
- Conservation effort certificates

### 4. **Network Support**
- Ethereum Mainnet
- Sepolia Testnet (for development)
- Polygon Network (for lower fees)

## 🚀 API Endpoints

### Network & Health
- `GET /api/blockchain/health` - Blockchain service health check
- `GET /api/blockchain/network` - Network information

### Wallet Operations
- `GET /api/blockchain/balance/:address` - Get ETH balance
- `GET /api/blockchain/transaction/:txHash` - Verify transaction

### Climate Data
- `POST /api/blockchain/climate-data` - Store climate data
- `GET /api/blockchain/climate-data/:index` - Retrieve climate data

### Carbon Credits
- `POST /api/blockchain/carbon-credits/mint` - Mint carbon credits
- `GET /api/blockchain/carbon-credits/balance/:address` - Get carbon credit balance

### Environmental NFTs
- `POST /api/blockchain/nft/mint` - Mint environmental NFT

## 📋 Usage Examples

### Store Climate Data
```bash
curl -X POST http://localhost:5000/api/blockchain/climate-data \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Amazon Rainforest",
    "temperature": 28.5,
    "humidity": 85.2
  }'
```

### Mint Carbon Credits
```bash
curl -X POST http://localhost:5000/api/blockchain/carbon-credits/mint \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "amount": 100,
    "projectId": "REFORESTATION_001"
  }'
```

### Check ETH Balance
```bash
curl http://localhost:5000/api/blockchain/balance/0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

## ⚙️ Configuration

### Environment Variables
```bash
# Blockchain Configuration
INFURA_PROJECT_ID=your_infura_project_id
BLOCKCHAIN_PRIVATE_KEY=your_private_key
DEFAULT_NETWORK=sepolia

# Smart Contract Addresses
CLIMATE_DATA_CONTRACT=0x...
CARBON_CREDITS_CONTRACT=0x...
ENVIRONMENTAL_NFT_CONTRACT=0x...
```

### Network Configuration
The system supports multiple networks:
- **Sepolia** (default for development)
- **Mainnet** (for production)
- **Polygon** (for lower gas fees)

## 🛠️ Smart Contracts

### ClimateDataStorage.sol
- Stores climate measurements immutably
- Emits events for data tracking
- Gas-efficient storage structure

### CarbonCreditsToken.sol
- ERC20-compliant carbon credit token
- Project-based credit allocation
- Burn functionality for offsetting

### Environmental NFTs
- ERC721-compliant tokens
- Unique environmental achievements
- Metadata support for project details

## 🧪 Testing

### Run Blockchain Tests
```bash
npm run test:blockchain
```

### Test Requirements
- Backend server running
- Valid blockchain configuration
- Test wallet with funds (for transaction tests)

## 🔐 Security Features

### Input Validation
- Ethereum address format validation
- Transaction hash verification
- Amount and parameter validation

### Error Handling
- Comprehensive error messages
- Network failure fallbacks
- Transaction retry logic

### Gas Optimization
- Efficient data structures
- Batch operations where possible
- Gas price monitoring

## 📊 Data Structures

### Climate Data Record
```typescript
interface ClimateDataRecord {
  id: number;
  location: string;
  temperature: number;
  humidity: number;
  timestamp: number;
  txHash?: string;
}
```

### Carbon Credit
```typescript
interface CarbonCredit {
  amount: number;
  projectId: string;
  recipient: string;
  txHash?: string;
}
```

### Environmental NFT
```typescript
interface EnvironmentalNFT {
  tokenId: number;
  recipient: string;
  projectType: string;
  tokenURI: string;
  txHash?: string;
}
```

## 🚨 Important Notes

### Gas Fees
- All write operations require gas fees
- Use Sepolia testnet for development
- Consider Polygon for lower costs

### Network Reliability
- Implement proper error handling
- Use retry mechanisms for failed transactions
- Monitor network congestion

### Private Key Security
- Never commit private keys to version control
- Use environment variables
- Consider using hardware wallets for production

## 🔄 Integration with Climate Platform

### Frontend Integration
- Add Web3 wallet connection
- Display transaction status
- Show blockchain data in UI

### Data Flow
1. Collect environmental data
2. Process and validate
3. Store on blockchain
4. Update frontend with transaction hash
5. Verify transaction completion

### Future Enhancements
- Multi-signature wallet support
- Layer 2 scaling solutions
- Cross-chain compatibility
- Automated carbon credit calculation

## 📞 Support

For blockchain integration support:
1. Check network connectivity
2. Verify smart contract deployment
3. Ensure sufficient wallet balance
4. Review transaction logs
