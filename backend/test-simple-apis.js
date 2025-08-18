// Test the simplified server on port 5001
const http = require('http');

function testEndpoint(path, name) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔄 Testing ${name}...`);
    
    const options = {
      hostname: 'localhost',
      port: 5001,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      console.log(`📊 Status: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${name} - SUCCESS`);
          console.log(`📄 Data items: ${Array.isArray(jsonData) ? jsonData.length : 'Object'}`);
          resolve({ success: true, name, data: jsonData });
        } catch (e) {
          console.log(`❌ ${name} - Invalid JSON response`);
          resolve({ success: false, name, error: 'Invalid JSON' });
        }
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${name} - Failed: ${err.message}`);
      resolve({ success: false, name, error: err.message });
    });

    req.on('timeout', () => {
      console.log(`❌ ${name} - Timeout`);
      req.destroy();
      resolve({ success: false, name, error: 'Timeout' });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Simplified Server (Port 5001)');
  console.log('==========================================');
  
  const tests = [
    { path: '/health', name: 'Health Check' },
    { path: '/api/environmental-data/nasa', name: 'NASA Earth Data' },
    { path: '/api/environmental-data/forest-watch', name: 'Global Forest Watch' },
    { path: '/api/environmental-data/world-bank', name: 'World Bank Climate' },
    { path: '/api/environmental-data/carbon-interface', name: 'Carbon Interface' },
    { path: '/api/environmental-data/earth-engine', name: 'Google Earth Engine' }
  ];
  
  const results = [];
  for (const test of tests) {
    const result = await testEndpoint(test.path, test.name);
    results.push(result);
  }
  
  console.log('\n📋 TEST SUMMARY');
  console.log('================');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (successful.length === results.length) {
    console.log('\n🎊 ALL TESTS PASSED!');
    console.log('The server structure and endpoints are working correctly.');
  }
}

runTests().catch(console.error);
