const testEndpoints = async () => {
  const BASE_URL = 'http://localhost:5000';
  
  console.log('🧪 Testing Backend API Endpoints...\n');

  // Test Health Endpoint
  console.log('1. Testing Health Endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Health:', data);
  } catch (error) {
    console.log('❌ Health failed:', error.message);
  }

  // Test Environmental Data Endpoint
  console.log('\n2. Testing Environmental Data Endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/environmental-data?type=all`);
    const data = await response.json();
    console.log('✅ Environmental Data:', {
      success: data.success,
      dataTypes: Object.keys(data.data),
      workingAPIs: data.workingAPIs,
      fallbackAPIs: data.fallbackAPIs
    });
  } catch (error) {
    console.log('❌ Environmental Data failed:', error.message);
  }

  // Test AI Chat Endpoint
  console.log('\n3. Testing AI Chat Endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/ai-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'What is climate change?',
        history: []
      })
    });
    const data = await response.json();
    console.log('✅ AI Chat:', {
      success: data.success,
      responseLength: data.response.length,
      preview: data.response.substring(0, 100) + '...'
    });
  } catch (error) {
    console.log('❌ AI Chat failed:', error.message);
  }

  console.log('\n✨ Backend API testing completed!');
};

testEndpoints();
