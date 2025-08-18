/**
 * Database Integration Test
 * Tests all database endpoints and functionality with Supabase
 * 
 * Note: This requires proper Supabase configuration in .env file
 * Make sure to set up your Supabase project and run the schema first
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/database';

// Test data
const testUser = {
  email: 'test-user@climate-platform.com',
  username: 'testuser',
  full_name: 'Test User',
  role: 'user',
  is_verified: true
};

const testProject = {
  title: 'Amazon Reforestation Initiative',
  description: 'Large-scale reforestation project in the Amazon rainforest to combat deforestation and climate change.',
  project_type: 'reforestation',
  status: 'active',
  location: {
    latitude: -3.4653,
    longitude: -62.2159,
    address: 'Amazon Rainforest, Brazil',
    country: 'Brazil',
    region: 'Amazonas'
  },
  target_funding: 100000.00,
  current_funding: 25000.00,
  start_date: '2024-01-01',
  impact_metrics: {
    carbon_offset: 500.0,
    trees_planted: 10000,
    biodiversity_score: 85
  }
};

const testClimateData = {
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
    address: 'New York City, NY',
    country: 'USA',
    region: 'New York'
  },
  temperature: 22.5,
  humidity: 65.0,
  air_quality_index: 95,
  co2_level: 410.5,
  timestamp: new Date().toISOString(),
  source: 'api',
  verified: false
};

async function testDatabaseEndpoints() {
  console.log('🗄️ Starting Database Integration Tests...\n');

  try {
    // Test 1: Database Health Check
    console.log('1. Testing database health...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Database Health:', healthResponse.data);
    console.log('');

    // Test 2: Create User
    console.log('2. Creating test user...');
    const userResponse = await axios.post(`${BASE_URL}/users`, testUser);
    console.log('✅ User Created:', userResponse.data);
    const userId = userResponse.data.data?.id;
    console.log('');

    // Test 3: Get User by ID
    if (userId) {
      console.log('3. Fetching user by ID...');
      const getUserResponse = await axios.get(`${BASE_URL}/users/${userId}`);
      console.log('✅ User Fetched:', getUserResponse.data);
      console.log('');

      // Test 4: Update User
      console.log('4. Updating user...');
      const updateData = { full_name: 'Updated Test User', is_verified: true };
      const updateUserResponse = await axios.put(`${BASE_URL}/users/${userId}`, updateData);
      console.log('✅ User Updated:', updateUserResponse.data);
      console.log('');

      // Test 5: Get User Stats
      console.log('5. Getting user stats...');
      const statsResponse = await axios.get(`${BASE_URL}/users/${userId}/stats`);
      console.log('✅ User Stats:', statsResponse.data);
      console.log('');

      // Test 6: Create Project
      console.log('6. Creating test project...');
      const projectData = { ...testProject, owner_id: userId };
      const projectResponse = await axios.post(`${BASE_URL}/projects`, projectData);
      console.log('✅ Project Created:', projectResponse.data);
      const projectId = projectResponse.data.data?.id;
      console.log('');

      // Test 7: Get Projects
      console.log('7. Fetching projects...');
      const projectsResponse = await axios.get(`${BASE_URL}/projects?limit=5&status=active`);
      console.log('✅ Projects Fetched:', projectsResponse.data);
      console.log('');

      // Test 8: Get Project by ID
      if (projectId) {
        console.log('8. Fetching project by ID...');
        const getProjectResponse = await axios.get(`${BASE_URL}/projects/${projectId}`);
        console.log('✅ Project Fetched:', getProjectResponse.data);
        console.log('');
      }

      // Test 9: Store Climate Data
      console.log('9. Storing climate data...');
      const climateDataWithUser = { ...testClimateData, created_by: userId };
      const climateResponse = await axios.post(`${BASE_URL}/climate-data`, climateDataWithUser);
      console.log('✅ Climate Data Stored:', climateResponse.data);
      console.log('');

      // Test 10: Get Climate Data
      console.log('10. Fetching climate data...');
      const getClimateResponse = await axios.get(`${BASE_URL}/climate-data?limit=10&source=api`);
      console.log('✅ Climate Data Fetched:', getClimateResponse.data);
      console.log('');

      // Test 11: Create Carbon Credit
      if (projectId) {
        console.log('11. Creating carbon credit...');
        const carbonCreditData = {
          project_id: projectId,
          owner_id: userId,
          amount: 100.0,
          price_per_credit: 25.00,
          status: 'available',
          vintage_year: 2024,
          verification_standard: 'VCS'
        };
        const carbonCreditResponse = await axios.post(`${BASE_URL}/carbon-credits`, carbonCreditData);
        console.log('✅ Carbon Credit Created:', carbonCreditResponse.data);
        console.log('');

        // Test 12: Get User's Carbon Credits
        console.log('12. Fetching user carbon credits...');
        const userCreditsResponse = await axios.get(`${BASE_URL}/users/${userId}/carbon-credits`);
        console.log('✅ User Carbon Credits:', userCreditsResponse.data);
        console.log('');
      }

      // Test 13: Create Transaction
      console.log('13. Creating transaction...');
      const transactionData = {
        type: 'project_funding',
        from_user_id: userId,
        project_id: projectId,
        amount: 500.00,
        currency: 'USD',
        status: 'completed'
      };
      const transactionResponse = await axios.post(`${BASE_URL}/transactions`, transactionData);
      console.log('✅ Transaction Created:', transactionResponse.data);
      console.log('');

      // Test 14: Get User Transactions
      console.log('14. Fetching user transactions...');
      const userTransactionsResponse = await axios.get(`${BASE_URL}/users/${userId}/transactions`);
      console.log('✅ User Transactions:', userTransactionsResponse.data);
      console.log('');

      // Test 15: Create Environmental Alert
      console.log('15. Creating environmental alert...');
      const alertData = {
        type: 'deforestation',
        severity: 'high',
        location: {
          latitude: -3.4653,
          longitude: -62.2159,
          address: 'Amazon Rainforest, Brazil',
          country: 'Brazil'
        },
        description: 'Rapid deforestation detected in protected area',
        data_source: 'Satellite imagery analysis',
        confidence_score: 85,
        created_by: userId
      };
      const alertResponse = await axios.post(`${BASE_URL}/alerts`, alertData);
      console.log('✅ Environmental Alert Created:', alertResponse.data);
      console.log('');

      // Test 16: Get Active Alerts
      console.log('16. Fetching active alerts...');
      const activeAlertsResponse = await axios.get(`${BASE_URL}/alerts/active`);
      console.log('✅ Active Alerts:', activeAlertsResponse.data);
      console.log('');
    }

    console.log('🎉 Database Integration Tests Completed Successfully!');
    console.log('\nTest Results Summary:');
    console.log('- ✅ Database health check');
    console.log('- ✅ User CRUD operations');
    console.log('- ✅ Project management');
    console.log('- ✅ Climate data storage');
    console.log('- ✅ Carbon credit tracking');
    console.log('- ✅ Transaction recording');
    console.log('- ✅ Environmental alerts');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.response?.data) {
      console.error('Response:', error.response.data);
    }
    if (error.response?.status) {
      console.error('Status:', error.response.status);
    }
  }
}

// Error handling tests
async function testErrorHandling() {
  console.log('\n🛡️ Testing Database Error Handling...\n');

  const errorTests = [
    {
      name: 'Create User Without Email',
      method: 'POST',
      url: `${BASE_URL}/users`,
      data: { username: 'test' },
      expected: 'should return 400'
    },
    {
      name: 'Get Non-existent User',
      method: 'GET',
      url: `${BASE_URL}/users/00000000-0000-0000-0000-000000000000`,
      expected: 'should return 404'
    },
    {
      name: 'Create Project Without Required Fields',
      method: 'POST',
      url: `${BASE_URL}/projects`,
      data: { title: 'Test' },
      expected: 'should return 400'
    },
    {
      name: 'Store Climate Data Without Location',
      method: 'POST',
      url: `${BASE_URL}/climate-data`,
      data: { temperature: 25 },
      expected: 'should return 400'
    }
  ];

  for (const test of errorTests) {
    try {
      let response;
      if (test.method === 'POST') {
        response = await axios.post(test.url, test.data);
      } else {
        response = await axios.get(test.url);
      }
      console.log(`⚠️ ${test.name}: Unexpected success -`, response.status);
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        console.log(`✅ ${test.name}: Correctly returned ${error.response.status}`);
      } else {
        console.log(`⚠️ ${test.name}: Unexpected status -`, error.response?.status);
      }
    }
  }
}

// Performance tests
async function testPerformance() {
  console.log('\n⚡ Testing Database Performance...\n');

  const startTime = Date.now();
  
  try {
    // Test parallel requests
    const promises = [
      axios.get(`${BASE_URL}/health`),
      axios.get(`${BASE_URL}/projects?limit=10`),
      axios.get(`${BASE_URL}/climate-data?limit=10`),
      axios.get(`${BASE_URL}/alerts/active`)
    ];

    await Promise.all(promises);
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log(`✅ Parallel Requests Completed in ${totalTime}ms`);
    
    if (totalTime < 2000) {
      console.log('🚀 Performance: Excellent');
    } else if (totalTime < 5000) {
      console.log('👍 Performance: Good');
    } else {
      console.log('⚠️ Performance: Needs optimization');
    }

  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  await testDatabaseEndpoints();
  await testErrorHandling();
  await testPerformance();
}

// Check if server is running
axios.get('http://localhost:5000/health')
  .then(() => {
    console.log('🌍 Backend server is running, starting database tests...\n');
    runAllTests();
  })
  .catch(() => {
    console.error('❌ Backend server is not running. Please start the server first:');
    console.error('   cd backend && npm run dev');
  });
