const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAllAPIs() {
    console.log('🧪 Comprehensive API Testing...\n');

    const tests = [
        {
            name: 'Health Endpoint',
            url: `${BASE_URL}/health`,
            method: 'GET'
        },
        {
            name: 'Environmental Data',
            url: `${BASE_URL}/api/environmental-data`,
            method: 'GET'
        },
        {
            name: 'AI Chat',
            url: `${BASE_URL}/api/ai-chat`,
            method: 'POST',
            data: { message: 'Hello' }
        },
        {
            name: 'Blockchain Status',
            url: `${BASE_URL}/api/blockchain/status`,
            method: 'GET'
        },
        {
            name: 'Database Users',
            url: `${BASE_URL}/api/database/users`,
            method: 'GET'
        },
        {
            name: 'Database Projects',
            url: `${BASE_URL}/api/database/projects`,
            method: 'GET'
        },
        {
            name: 'Database Climate Data',
            url: `${BASE_URL}/api/database/climate-data`,
            method: 'GET'
        },
        {
            name: 'Database Carbon Credits',
            url: `${BASE_URL}/api/database/carbon-credits`,
            method: 'GET'
        }
    ];

    let successCount = 0;
    let totalTests = tests.length;

    for (const test of tests) {
        try {
            console.log(`📡 Testing ${test.name}...`);
            
            const config = {
                method: test.method,
                url: test.url,
                timeout: 10000,
                ...(test.data && { data: test.data })
            };

            const response = await axios(config);
            console.log(`✅ ${test.name}: Status ${response.status}`);
            successCount++;
            
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.log(`❌ ${test.name}: Server not running`);
            } else if (error.response) {
                console.log(`⚠️  ${test.name}: Status ${error.response.status} - ${error.response.statusText}`);
            } else {
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }

    console.log(`\n📊 Test Results: ${successCount}/${totalTests} APIs working properly`);
    
    if (successCount === 0) {
        console.log('🚨 Backend server appears to be down. Please start it first:');
        console.log('   cd backend && npm run dev');
    } else if (successCount < totalTests) {
        console.log('⚠️  Some APIs are not responding properly. Check server logs.');
    } else {
        console.log('🎉 All APIs are working correctly!');
    }
}

testAllAPIs().catch(console.error);
