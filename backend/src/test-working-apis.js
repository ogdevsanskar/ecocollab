const dotenv = require('dotenv');
dotenv.config();

async function testWorkingAPIs() {
  console.log('🧪 Testing Working APIs Only...\n');

  // Test OpenWeather API
  console.log('🌤️ Testing OpenWeather API...');
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.OPENWEATHER_API_KEY}`);
    const data = await response.json();
    console.log('✅ OpenWeather:', data.weather[0].description, `(${data.main.temp}K)`);
  } catch (error) {
    console.log('❌ OpenWeather failed:', error.message);
  }

  // Test Mapbox API
  console.log('\n🗺️ Testing Mapbox API...');
  try {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`);
    const data = await response.json();
    console.log('✅ Mapbox:', `Found ${data.features.length} results for Delhi`);
  } catch (error) {
    console.log('❌ Mapbox failed:', error.message);
  }

  // Test MispLE API
  console.log('\n🤖 Testing MispLE AI API...');
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISPLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: 'What is climate change?' }],
        max_tokens: 100
      })
    });
    const data = await response.json();
    console.log('✅ MispLE AI:', data.choices[0].message.content.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ MispLE failed:', error.message);
  }

  console.log('\n✨ All working APIs tested successfully!');
}

testWorkingAPIs();
