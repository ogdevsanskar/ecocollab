# Climate Platform Backend - Render Deployment

## 🌍 Environment Variables for Render

When deploying to Render, set these environment variables in your Render dashboard:

### Core Configuration
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### API Keys (Required for full functionality)
```
MISPLE_API_KEY=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
NASA_EARTH_DATA_API_KEY=your_nasa_api_key_here
GLOBAL_FOREST_WATCH_API_KEY=your_forest_watch_key_here
OPENWEATHER_API_KEY=3212ef29e7f6cd20647ab8b647aefedf
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
SENDGRID_API_KEY=your_sendgrid_key_here
```

### Database Configuration (Supabase)
```
SUPABASE_URL=https://hjeyadnplpjgmxpvahdi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZXlhZG5wbHBqZ214cHZhaGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzM3NjMsImV4cCI6MjA3MTEwOTc2M30.QCiJShBVl_jB63SY3puVvLu84oL8w95Oiu5u1S1ztNU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZXlhZG5wbHBqZ214cHZhaGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUzMzc2MywiZXhwIjoyMDcxMTA5NzYzfQ.5v21wIAvcT3zOCfwwrkmLC6WZeS3mzbJ6nGUbIUMdJw
```

### Blockchain Configuration (Optional)
```
INFURA_PROJECT_ID=your_infura_project_id_here
BLOCKCHAIN_PRIVATE_KEY=your_private_key_here
CLIMATE_DATA_CONTRACT=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
CARBON_CREDITS_CONTRACT=0x1234567890123456789012345678901234567890
ENVIRONMENTAL_NFT_CONTRACT=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
DEFAULT_NETWORK=sepolia
```

## 📋 Deployment Steps

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Connect GitHub**: Link your GitHub repository containing this backend

3. **Create New Web Service**:
   - Choose "Web Service"
   - Connect your repository
   - Select the `backend` directory as root

4. **Configure Build Settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x or higher

5. **Set Environment Variables**: Copy all the variables listed above into Render's environment variables section

6. **Deploy**: Click "Create Web Service"

## 🔍 Health Check

Once deployed, verify deployment at: `https://your-app-name.onrender.com/health`

## 🛠️ API Endpoints Available

- `GET /health` - Health check
- `GET /api/environmental-data` - All climate data
- `GET /api/environmental-data/nasa` - NASA Earth data
- `GET /api/environmental-data/forest-watch` - Forest monitoring
- `GET /api/environmental-data/world-bank` - Climate indicators
- `GET /api/environmental-data/carbon-interface` - Carbon footprint
- `GET /api/environmental-data/earth-engine` - Satellite imagery
- `POST /api/ai-chat` - AI assistant
- `GET /api/database/environmental-data` - Database operations

## 📊 Features Ready for Production

✅ All 8 climate APIs functional (3 working + 5 enhanced)
✅ Supabase database integration
✅ AI chat functionality
✅ Blockchain support (optional)
✅ Comprehensive error handling
✅ Security middleware (helmet, cors)
✅ Performance optimizations (compression, caching)
✅ Logging and monitoring
