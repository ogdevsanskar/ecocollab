# 🌍 EcoChain Climate Platform

A comprehensive Web3-powered climate action platform that enables global collaboration for environmental monitoring, project funding, and real-time alert systems.

## ✨ Features

### 🔔 SMS & Call Alert System
- **Real-time environmental alerts** via SMS and voice calls using Twilio
- **Condition-based triggers** for temperature, air quality, deforestation, and funding thresholds
- **Multi-stakeholder notifications** for governments, NGOs, researchers, and communities
- **Automated monitoring** with configurable thresholds and locations

### 🌐 API Integration
- **Working APIs**: OpenWeather (weather/air quality), Mapbox (geocoding/maps), MispLE AI (climate assistant)
- **Comprehensive fallback systems** for failed APIs
- **Real-time environmental data** from multiple sources
- **Blockchain integration** for transparent funding and project tracking

### 🎯 Frontend Features
- **Interactive dashboard** with real-time climate metrics
- **Project management** with funding tracking and collaboration tools
- **Data collection** system for citizen scientists
- **Community platform** for environmental advocacy
- **AI-powered climate assistant** for insights and recommendations

### 🔧 Backend Architecture
- **Express.js server** with TypeScript
- **RESTful API** with comprehensive error handling
- **Automated monitoring service** with configurable thresholds
- **Alert broadcasting system** with SMS/call capabilities
- **Database integration** with Supabase
- **Blockchain services** for Web3 functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd ecochain-climate-platform
chmod +x setup.sh
./setup.sh
```

### 2. Configure API Keys
Edit the environment files created by the setup script:

**Frontend (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:10000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
OPENAI_API_KEY=your_openai_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
```

**Backend (`backend/.env`):**
```env
# Working APIs (already configured)
OPENWEATHER_API_KEY=3212ef29e7f6cd20647ab8b647aefedf
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
MISPLE_API_KEY=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

# Twilio for SMS/Call Alerts (configure these)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Server Configuration
PORT=10000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start the Application
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
npm run dev
```

### 4. Access the Platform
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:10000
- **Integration Tests**: http://localhost:3000/test-integration
- **Health Check**: http://localhost:10000/health

## 🧪 Testing the Integration

Visit the **Integration Testing Dashboard** at http://localhost:3000/test-integration to:

1. **Test Backend Connection** - Verify API connectivity
2. **Test SMS Alerts** - Send test SMS notifications
3. **Test Environmental Alerts** - Trigger environmental notifications
4. **Test All Systems** - Run comprehensive integration tests

### Sample Test Scenarios

**Environmental Alert Test:**
```bash
curl -X POST http://localhost:10000/api/alerts/environmental \
  -H "Content-Type: application/json" \
  -d '{
    "title": "High Temperature Alert",
    "message": "Temperature exceeds 40°C in monitoring zone",
    "severity": "critical",
    "location": {"lat": 40.7128, "lng": -74.0060, "name": "New York"}
  }'
```

**Funding Alert Test:**
```bash
curl -X POST http://localhost:10000/api/alerts/funding \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Low Funding Alert",
    "message": "Project funding below critical threshold",
    "severity": "high",
    "projectId": "amazon-restoration-001"
  }'
```

## 📊 Monitoring System

The platform includes an automated monitoring system that:

- **Monitors environmental conditions** every 30 minutes
- **Triggers alerts** when thresholds are exceeded
- **Tracks multiple locations** globally
- **Sends SMS/call notifications** to relevant stakeholders

### Monitoring Endpoints

- `GET /api/monitoring/status` - Get monitoring system status
- `POST /api/monitoring/start` - Start automated monitoring
- `POST /api/monitoring/stop` - Stop automated monitoring
- `POST /api/monitoring/check` - Trigger manual monitoring check
- `PUT /api/monitoring/thresholds` - Update alert thresholds

### Default Monitoring Thresholds

```json
{
  "temperature": {
    "high": 35,
    "critical": 40
  },
  "airQuality": {
    "unhealthy": 150,
    "hazardous": 200
  },
  "deforestation": {
    "moderate": 10,
    "severe": 50
  },
  "funding": {
    "low": 10000,
    "critical": 5000
  }
}
```

## 🔌 API Endpoints

### Core APIs
- `GET /health` - Backend health check
- `POST /api/ai-chat` - AI climate assistant
- `GET /api/environmental-data` - Environmental data aggregation
- `GET /api/projects` - Project management
- `POST /api/alerts/{type}` - Alert system

### Alert Types
- `/api/alerts/environmental` - Environmental incidents
- `/api/alerts/funding` - Project funding alerts
- `/api/alerts/project` - Project milestone alerts
- `/api/alerts/security` - Security incident alerts
- `/api/alerts/test` - Test alert system

### Monitoring APIs
- `/api/monitoring/status` - System status
- `/api/monitoring/start` - Start monitoring
- `/api/monitoring/check-conditions` - Manual condition check

## 🔧 Configuration

### Twilio SMS/Call Setup

1. **Create Twilio Account**: https://www.twilio.com/
2. **Get credentials** from Twilio Console
3. **Update backend/.env**:
   ```env
   TWILIO_ACCOUNT_SID=AC_your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### AI Chat Setup

1. **OpenAI API**: Get key from https://platform.openai.com/
2. **Mistral API**: Get key from https://console.mistral.ai/
3. **Update .env.local**:
   ```env
   OPENAI_API_KEY=sk-...
   MISTRAL_API_KEY=your_mistral_key
   ```

## 🌟 Key Features in Action

### 1. Automated Environmental Monitoring
- Real-time weather and air quality monitoring
- Automatic deforestation detection
- Project funding threshold alerts
- SMS/call notifications to stakeholders

### 2. Interactive Dashboard
- Live environmental metrics
- Project funding progress
- Alert management system
- AI-powered insights

### 3. Community Collaboration
- Multi-stakeholder project creation
- Transparent blockchain funding
- Citizen science data collection
- Global environmental impact tracking

### 4. Web3 Integration
- MetaMask wallet connection
- Cryptocurrency project funding
- Blockchain transaction tracking
- NFT environmental badges

## 🔄 Button Functionality

All frontend buttons are now connected to backend APIs:

- **"Connect Wallet"** → Web3 wallet integration
- **"Report Incident"** → Triggers environmental alert with SMS/call notifications
- **"Fund Project"** → Initiates funding with alert notifications
- **"Create Project"** → Creates project with stakeholder notifications
- **"Submit Observation"** → Sends data with severity-based alerts
- **"Take Action"** → Triggers emergency response protocols

## 📱 Mobile Support

The platform is fully responsive and includes:
- Mobile-optimized interface
- GPS location capture
- Photo upload capabilities
- Offline data collection support

## 🚀 Deployment

### Production Environment

1. **Update environment variables** for production
2. **Configure Twilio** with production credentials
3. **Set up domain** and update CORS settings
4. **Deploy backend** to Render/Heroku
5. **Deploy frontend** to Vercel/Netlify

### Environment Variables for Production

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
TWILIO_ACCOUNT_SID=your_production_sid
TWILIO_AUTH_TOKEN=your_production_token
```

## 🔍 Troubleshooting

### Common Issues

1. **SMS alerts not working**: Check Twilio credentials in backend/.env
2. **Backend connection failed**: Ensure backend is running on port 10000
3. **AI chat not responding**: Configure OpenAI or Mistral API keys
4. **Environmental data errors**: Working APIs have fallback data

### Debug Mode

Set `NODE_ENV=development` in backend/.env for detailed error logging.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with integration dashboard
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the Integration Testing Dashboard
- Review API endpoint documentation
- Verify environment variable configuration
- Test individual components before full integration

---

Built with ❤️ for climate action and environmental protection 🌍