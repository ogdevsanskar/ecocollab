// Simple test to check if server is responsive
const http = require('http');

function testConnection() {
  console.log('🔍 Testing connection to localhost:5000...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/health',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✅ Connection successful! Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('📄 Response:', data);
      process.exit(0);
    });
  });

  req.on('error', (err) => {
    console.log(`❌ Connection failed: ${err.message}`);
    process.exit(1);
  });

  req.on('timeout', () => {
    console.log('❌ Connection timeout');
    req.destroy();
    process.exit(1);
  });

  req.end();
}

testConnection();
