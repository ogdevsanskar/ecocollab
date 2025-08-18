/**
 * Simplified Server Test - bypassing database initialization
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001; // Use different port to avoid conflicts

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Test server running',
    timestamp: new Date().toISOString()
  });
});

// Test enhanced APIs (simplified versions)
app.get('/api/environmental-data/nasa', (req, res) => {
  res.json([
    {
      id: 'test_nasa_1',
      name: 'Test Location',
      latitude: 40.7589,
      longitude: -73.9851,
      temperature: 15.5,
      co2_level: 420,
      test: true
    }
  ]);
});

app.get('/api/environmental-data/forest-watch', (req, res) => {
  res.json([
    {
      id: 'test_forest_1',
      name: 'Test Forest',
      latitude: -3.4653,
      longitude: -62.2159,
      deforestation_rate: 0.85,
      alert_count: 12,
      test: true
    }
  ]);
});

app.get('/api/environmental-data/world-bank', (req, res) => {
  res.json([
    {
      country: 'Test Country',
      temperature_change: 1.2,
      gdp_per_capita: 25000,
      renewable_energy_percent: 35,
      test: true
    }
  ]);
});

app.get('/api/environmental-data/carbon-interface', (req, res) => {
  res.json([
    {
      id: 'test_carbon_1',
      activity: 'test_activity',
      emissions_kg_co2: 125.5,
      category: 'transportation',
      test: true
    }
  ]);
});

app.get('/api/environmental-data/earth-engine', (req, res) => {
  res.json([
    {
      id: 'test_imagery_1',
      location: 'Test Location',
      latitude: 35.6762,
      longitude: 139.6503,
      image_url: 'https://test-url.com/image.jpg',
      resolution: '10m',
      test: true
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`🧪 Test server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 Ready for API testing!`);
});
