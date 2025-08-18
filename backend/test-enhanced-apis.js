/**
 * Test script for Enhanced APIs
 * Tests all 5 previously non-working APIs to verify they're now functional
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const apiTests = [
  {
    name: 'NASA Earth Data (Enhanced)',
    endpoint: '/api/environmental-data/nasa',
    description: 'Real-time Earth observation data from NASA satellites'
  },
  {
    name: 'Global Forest Watch (Enhanced)',
    endpoint: '/api/environmental-data/forest-watch',
    description: 'Forest monitoring and deforestation alerts'
  },
  {
    name: 'World Bank Climate (Enhanced)',
    endpoint: '/api/environmental-data/world-bank',
    description: 'Climate change indicators and economic data'
  },
  {
    name: 'Carbon Interface (Enhanced)',
    endpoint: '/api/environmental-data/carbon-interface',
    description: 'Carbon footprint and emissions calculations'
  },
  {
    name: 'Google Earth Engine (Enhanced)',
    endpoint: '/api/environmental-data/earth-engine',
    description: 'Satellite imagery and geospatial analysis'
  }
];

async function testAPI(api) {
  console.log(`\n🔄 Testing ${api.name}...`);
  console.log(`📝 Description: ${api.description}`);
  console.log(`🌐 Endpoint: ${api.endpoint}`);
  
  try {
    const response = await axios.get(`${BASE_URL}${api.endpoint}`);
    
    if (response.status === 200 && response.data) {
      console.log(`✅ SUCCESS: ${api.name} is working!`);
      console.log(`📊 Response status: ${response.status}`);
      console.log(`📄 Data length: ${Array.isArray(response.data) ? response.data.length : 'Object'} items`);
      
      // Show sample data structure
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log(`🔍 Sample data keys: ${Object.keys(response.data[0]).join(', ')}`);
      } else if (typeof response.data === 'object') {
        console.log(`🔍 Response keys: ${Object.keys(response.data).join(', ')}`);
      }
      
      return { success: true, api: api.name, data: response.data };
    } else {
      console.log(`❌ FAILED: ${api.name} - Invalid response`);
      return { success: false, api: api.name, error: 'Invalid response' };
    }
  } catch (error) {
    console.log(`❌ FAILED: ${api.name} - ${error.message}`);
    return { success: false, api: api.name, error: error.message };
  }
}

async function testHealthCheck() {
  console.log('🏥 Testing Health Check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed');
    return true;
  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('🌍 Climate Platform - Enhanced API Testing');
  console.log('==========================================');
  
  // Test health check first
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    console.log('\n❌ Server is not responding. Please ensure the backend is running on port 5000.');
    process.exit(1);
  }
  
  // Test all enhanced APIs
  const results = [];
  for (const api of apiTests) {
    const result = await testAPI(api);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay between tests
  }
  
  // Summary
  console.log('\n📋 TEST SUMMARY');
  console.log('================');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful APIs: ${successful.length}/5`);
  console.log(`❌ Failed APIs: ${failed.length}/5`);
  
  if (successful.length > 0) {
    console.log('\n🎉 Working APIs:');
    successful.forEach(r => console.log(`  • ${r.api}`));
  }
  
  if (failed.length > 0) {
    console.log('\n💥 Failed APIs:');
    failed.forEach(r => console.log(`  • ${r.api}: ${r.error}`));
  }
  
  if (successful.length === 5) {
    console.log('\n🎊 CONGRATULATIONS! All 5 enhanced APIs are now working!');
    console.log('The previously non-functional APIs have been successfully fixed.');
  } else {
    console.log(`\n⚠️  ${failed.length} APIs still need attention.`);
  }
}

// Run the tests
runAllTests().catch(console.error);
