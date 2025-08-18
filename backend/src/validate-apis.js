const dotenv = require('dotenv');
dotenv.config();

// API Keys from the provided data
const API_KEYS = {
  nasa_earth_api_key: process.env.NASA_EARTH_DATA_API_KEY,
  global_forest_watch_api_key: process.env.GLOBAL_FOREST_WATCH_API_KEY,
  openweather_api_key: process.env.OPENWEATHER_API_KEY,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  mapbox_api_key: process.env.MAPBOX_ACCESS_TOKEN,
  misple_api_key: process.env.MISPLE_API_KEY,
  stripe_publisher_key: process.env.STRIPE_PUBLISHER_KEY
};

class APIValidator {
  constructor() {
    this.results = [];
  }

  log(result) {
    this.results.push(result);
    const emoji = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${emoji} ${result.service}: ${result.message}`);
    if (result.response) {
      console.log(`   Response: ${JSON.stringify(result.response, null, 2).substring(0, 200)}...`);
    }
  }

  async testNASAEarthAPI() {
    try {
      console.log('\n🌍 Testing NASA Earth Data API...');
      const url = `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2021-01-01&dim=0.15&api_key=${API_KEYS.nasa_earth_api_key}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEYS.nasa_earth_api_key}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'NASA Earth Data API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}`,
          response: data,
          statusCode: response.status
        });
      } else {
        this.log({
          service: 'NASA Earth Data API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'NASA Earth Data API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testGlobalForestWatch() {
    try {
      console.log('\n🌲 Testing Global Forest Watch API...');
      const url = 'https://data-api.globalforestwatch.org/dataset/umd_tree_cover_loss/latest/query?sql=SELECT%20*%20FROM%20data%20WHERE%20iso%20%3D%20%27BRA%27%20LIMIT%2010';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEYS.global_forest_watch_api_key}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'Global Forest Watch API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}`,
          response: data,
          statusCode: response.status
        });
      } else {
        this.log({
          service: 'Global Forest Watch API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'Global Forest Watch API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testWorldBankClimate() {
    try {
      console.log('\n🌡️ Testing World Bank Climate API...');
      const url = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/IND.json';
      
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'World Bank Climate API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}`,
          response: data,
          statusCode: response.status
        });
      } else {
        this.log({
          service: 'World Bank Climate API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'World Bank Climate API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testOpenWeather() {
    try {
      console.log('\n🌤️ Testing OpenWeather API...');
      const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEYS.openweather_api_key}`;
      
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'OpenWeather API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}. Weather: ${data.weather?.[0]?.description || 'N/A'}`,
          response: data,
          statusCode: response.status
        });
      } else {
        this.log({
          service: 'OpenWeather API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'OpenWeather API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testSendGrid() {
    try {
      console.log('\n📧 Testing SendGrid API...');
      const url = 'https://api.sendgrid.com/v3/mail/send';
      
      const testEmail = {
        personalizations: [{
          to: [{ email: 'test@example.com' }],
          subject: 'API Test Email'
        }],
        from: { email: 'noreply@climateplatform.com' },
        content: [{
          type: 'text/plain',
          value: 'This is a test email for API validation.'
        }]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEYS.sendgrid_api_key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testEmail)
      });

      if (response.status === 202) {
        this.log({
          service: 'SendGrid API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status} (Accepted)`,
          statusCode: response.status
        });
      } else {
        const errorText = await response.text();
        this.log({
          service: 'SendGrid API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${errorText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'SendGrid API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testMapbox() {
    try {
      console.log('\n🗺️ Testing Mapbox API...');
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=${API_KEYS.mapbox_api_key}`;
      
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'Mapbox API',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}. Found ${data.features?.length || 0} results`,
          response: data,
          statusCode: response.status
        });
      } else {
        this.log({
          service: 'Mapbox API',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'Mapbox API',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testMispLE() {
    try {
      console.log('\n🤖 Testing MispLE API (via OpenRouter)...');
      const url = 'https://openrouter.ai/api/v1/chat/completions';
      
      const testRequest = {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 50
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEYS.misple_api_key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testRequest)
      });

      if (response.ok) {
        const data = await response.json();
        this.log({
          service: 'MispLE API (OpenRouter)',
          status: 'PASS',
          message: `API accessible. Status: ${response.status}. Response: ${data.choices?.[0]?.message?.content || 'N/A'}`,
          response: data,
          statusCode: response.status
        });
      } else {
        const errorText = await response.text();
        this.log({
          service: 'MispLE API (OpenRouter)',
          status: 'FAIL',
          message: `HTTP ${response.status}: ${errorText}`,
          statusCode: response.status
        });
      }
    } catch (error) {
      this.log({
        service: 'MispLE API (OpenRouter)',
        status: 'FAIL',
        message: `Network error: ${error.message || error}`
      });
    }
  }

  async testStripe() {
    try {
      console.log('\n💳 Testing Stripe API...');
      // Note: This is a publishable key, not a secret key, so we can't test server-side operations
      // We'll just validate the key format
      if (API_KEYS.stripe_publisher_key && API_KEYS.stripe_publisher_key.startsWith('pk_test_')) {
        this.log({
          service: 'Stripe API',
          status: 'WARNING',
          message: 'Publishable key detected. Format is valid but cannot test server operations.'
        });
      } else {
        this.log({
          service: 'Stripe API',
          status: 'FAIL',
          message: 'Invalid Stripe key format. Expected pk_test_ prefix.'
        });
      }
    } catch (error) {
      this.log({
        service: 'Stripe API',
        status: 'FAIL',
        message: `Error: ${error.message || error}`
      });
    }
  }

  async runAllTests() {
    console.log('🚀 Starting API Key Validation Tests...\n');
    
    await this.testNASAEarthAPI();
    await this.testGlobalForestWatch();
    await this.testWorldBankClimate();
    await this.testOpenWeather();
    await this.testSendGrid();
    await this.testMapbox();
    await this.testMispLE();
    await this.testStripe();

    this.printSummary();
  }

  printSummary() {
    console.log('\n📊 API Validation Summary:');
    console.log('='.repeat(50));
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const warnings = this.results.filter(r => r.status === 'WARNING').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️ Warnings: ${warnings}`);
    console.log(`📈 Total: ${this.results.length}`);
    
    if (failed > 0) {
      console.log('\n❌ Failed APIs:');
      this.results
        .filter(r => r.status === 'FAIL')
        .forEach(r => console.log(`   - ${r.service}: ${r.message}`));
    }
    
    if (warnings > 0) {
      console.log('\n⚠️ Warnings:');
      this.results
        .filter(r => r.status === 'WARNING')
        .forEach(r => console.log(`   - ${r.service}: ${r.message}`));
    }
  }
}

// Run the validation
const validator = new APIValidator();
validator.runAllTests().catch(console.error);

module.exports = APIValidator;
