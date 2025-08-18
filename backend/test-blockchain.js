/**
 * Blockchain Integration Test
 * Tests all blockchain endpoints and functionality
 * 
 * Note: This requires actual blockchain connection and test accounts
 * Make sure to set up your .env file with proper keys before running
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/blockchain';
const TEST_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'; // Example Ethereum address

async function testBlockchainEndpoints() {
  console.log('🔗 Starting Blockchain Integration Tests...\n');

  try {
    // Test 1: Network Health Check
    console.log('1. Testing blockchain service health...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Network Information
    console.log('2. Getting network information...');
    const networkResponse = await axios.get(`${BASE_URL}/network`);
    console.log('✅ Network Info:', networkResponse.data);
    console.log('');

    // Test 3: Get ETH Balance
    console.log('3. Getting ETH balance...');
    const balanceResponse = await axios.get(`${BASE_URL}/balance/${TEST_ADDRESS}`);
    console.log('✅ ETH Balance:', balanceResponse.data);
    console.log('');

    // Test 4: Get Carbon Credit Balance
    console.log('4. Getting carbon credit balance...');
    const carbonBalanceResponse = await axios.get(`${BASE_URL}/carbon-credits/balance/${TEST_ADDRESS}`);
    console.log('✅ Carbon Credit Balance:', carbonBalanceResponse.data);
    console.log('');

    // Test 5: Store Climate Data (requires gas fees)
    console.log('5. Testing climate data storage...');
    const climateData = {
      location: 'New York City',
      temperature: 23.5,
      humidity: 65.2
    };
    
    try {
      const storeResponse = await axios.post(`${BASE_URL}/climate-data`, climateData);
      console.log('✅ Climate Data Stored:', storeResponse.data);
      
      // Test 6: Retrieve Climate Data
      if (storeResponse.data.success && storeResponse.data.data.id !== undefined) {
        console.log('6. Retrieving stored climate data...');
        const retrieveResponse = await axios.get(`${BASE_URL}/climate-data/${storeResponse.data.data.id}`);
        console.log('✅ Climate Data Retrieved:', retrieveResponse.data);
      }
    } catch (error) {
      console.log('⚠️ Climate Data Storage (requires wallet with funds):', error.response?.data || error.message);
    }
    console.log('');

    // Test 7: Mint Carbon Credits (requires gas fees)
    console.log('7. Testing carbon credit minting...');
    const carbonCreditData = {
      recipient: TEST_ADDRESS,
      amount: 100,
      projectId: 'REFORESTATION_PROJECT_001'
    };
    
    try {
      const mintResponse = await axios.post(`${BASE_URL}/carbon-credits/mint`, carbonCreditData);
      console.log('✅ Carbon Credits Minted:', mintResponse.data);
    } catch (error) {
      console.log('⚠️ Carbon Credit Minting (requires wallet with funds):', error.response?.data || error.message);
    }
    console.log('');

    // Test 8: Mint Environmental NFT (requires gas fees)
    console.log('8. Testing environmental NFT minting...');
    const nftData = {
      recipient: TEST_ADDRESS,
      tokenURI: 'https://api.climate-platform.com/nft/metadata/1',
      projectType: 'Ocean Cleanup'
    };
    
    try {
      const nftResponse = await axios.post(`${BASE_URL}/nft/mint`, nftData);
      console.log('✅ Environmental NFT Minted:', nftResponse.data);
    } catch (error) {
      console.log('⚠️ Environmental NFT Minting (requires wallet with funds):', error.response?.data || error.message);
    }
    console.log('');

    // Test 9: Transaction Verification
    console.log('9. Testing transaction verification...');
    const testTxHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    try {
      const verifyResponse = await axios.get(`${BASE_URL}/transaction/${testTxHash}`);
      console.log('✅ Transaction Verification:', verifyResponse.data);
    } catch (error) {
      console.log('⚠️ Transaction Verification (test hash):', error.response?.data || error.message);
    }

    console.log('\n🎉 Blockchain Integration Tests Completed!');
    console.log('\nNote: Some tests may fail if:');
    console.log('- Blockchain wallet has insufficient funds');
    console.log('- Smart contracts are not deployed');
    console.log('- Network connection issues');
    console.log('- Invalid environment configuration');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.response?.data) {
      console.error('Response:', error.response.data);
    }
  }
}

// Error handling tests
async function testErrorHandling() {
  console.log('\n🛡️ Testing Error Handling...\n');

  const errorTests = [
    {
      name: 'Invalid Address Format',
      url: `${BASE_URL}/balance/invalid_address`,
      expected: 'should return 400'
    },
    {
      name: 'Invalid Transaction Hash',
      url: `${BASE_URL}/transaction/invalid_hash`,
      expected: 'should return 400'
    },
    {
      name: 'Invalid Climate Data Index',
      url: `${BASE_URL}/climate-data/-1`,
      expected: 'should return 400'
    }
  ];

  for (const test of errorTests) {
    try {
      const response = await axios.get(test.url);
      console.log(`⚠️ ${test.name}: Unexpected success -`, response.status);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log(`✅ ${test.name}: Correctly returned 400`);
      } else {
        console.log(`⚠️ ${test.name}: Unexpected status -`, error.response?.status);
      }
    }
  }
}

// Run tests
async function runAllTests() {
  await testBlockchainEndpoints();
  await testErrorHandling();
}

// Check if server is running
axios.get('http://localhost:5000/health')
  .then(() => {
    console.log('🌍 Backend server is running, starting blockchain tests...\n');
    runAllTests();
  })
  .catch(() => {
    console.error('❌ Backend server is not running. Please start the server first:');
    console.error('   cd backend && npm run dev');
  });
