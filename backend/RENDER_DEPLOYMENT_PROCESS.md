# 🚀 Complete Render Deployment Process

## Step-by-Step Guide to Deploy Climate Platform Backend

### Prerequisites ✅
- GitHub account
- Render account (free tier available)
- Your backend code ready (already completed!)

---

## Phase 1: Prepare Your Repository

### 1.1 Initialize Git Repository (if not already done)
```bash
cd "c:\Users\SANSKAR\Downloads\climate-platform (1)\backend"
git init
git add .
git commit -m "Initial commit - Climate Platform Backend ready for deployment"
```

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository" (green button)
3. Name it: `climate-platform-backend`
4. Make it **Public** (required for free Render deployment)
5. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/climate-platform-backend.git
git branch -M main
git push -u origin main
```

---

## Phase 2: Deploy on Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. **Dashboard**: Click "New +" button (top right)
2. **Service Type**: Select "Web Service"
3. **Connect Repository**: 
   - Click "Connect account" if needed
   - Find `climate-platform-backend` repository
   - Click "Connect"

### 2.3 Configure Service Settings

#### Basic Settings:
- **Name**: `climate-platform-backend`
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave blank (or enter `backend` if in monorepo)

#### Build & Deploy Settings:
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

#### Advanced Settings:
- **Node Version**: `18.17.0` (or latest 18.x)
- **Auto-Deploy**: `Yes` (recommended)

---

## Phase 3: Configure Environment Variables

### 3.1 Add Environment Variables
In Render dashboard, scroll to "Environment Variables" section:

#### Required Variables:
```bash
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-app.onrender.com
```

#### Database Configuration:
```bash
SUPABASE_URL=https://hjeyadnplpjgmxpvahdi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZXlhZG5wbHBqZ214cHZhaGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzM3NjMsImV4cCI6MjA3MTEwOTc2M30.QCiJShBVl_jB63SY3puVvLu84oL8w95Oiu5u1S1ztNU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZXlhZG5wbHBqZ214cHZhaGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUzMzc2MywiZXhwIjoyMDcxMTA5NzYzfQ.5v21wIAvcT3zOCfwwrkmLC6WZeS3mzbJ6nGUbIUMdJw
```

#### API Keys:
```bash
OPENWEATHER_API_KEY=3212ef29e7f6cd20647ab8b647aefedf
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
MISPLE_API_KEY=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
NASA_EARTH_DATA_API_KEY=eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImFiY2RlZmdoaWprbG1ubyIsImV4cCI6MTc2MDQ4NjM5OSwiaWF0IjoxNzU1Mjg2NDIzLCJpc3MiOiJodHRwczovL3Vycy5lYXJ0aGRhdGEubmFzYS5nb3YiLCJpZGVudGl0eV9wcm92aWRlciI6ImVkbF9vcHMiLCJhY3IiOiJlZGwiLCJhc3N1cmFuY2VfbGV2ZWwiOjN9.XI5g8_P-oMRlclLkln5U-KRbBjzQD-R7kmeXMTPvyM-UodLzGUiB4qVGO8IOV4KNoICle5OCuYqYo4gnAaDM5sTX8ew8tGaJcJzTekTqr7QHZlRcMbJO3car5xAjqv9PgdUVXA8LOL7PqwEuuIZ3twSnybtsevLMbagBTgfF8ksXdoxiGpofwyK7ja4GRDKykJxd96Q1LQz6bVnWlHC6peEHZokT7iUoiOVviSiolE2B8N8xomk-rXexduvewX0GiUMAaAK-Yu_Qt47kMeUg6xJBu6LUIUOfkI_nT7n6oSAuhmtdVVZwPrXSQaNKjVwAbCuqkW9qEdN5DomoI9zvlA
GLOBAL_FOREST_WATCH_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWY4ODdhNTlhMzhlYmRiMWI0ZGFkZiIsInJvbGUiOiJVU0VSIiwicHJvdmlkZXIiOiJsb2NhbCIsImVtYWlsIjoibmlydmlja2NoYWtyYWJvcnR5MDFAZ21haWwuY29tIiwiZXh0cmFVc2VyRGF0YSI6eyJhcHBzIjpbImdmdyJdfSwiY3JlYXRlZEF0IjoxNzU1Mjg3MDA2MzM3LCJpYXQiOjE3NTUyODcwMDZ9.5CgpKH0lH_9aJL-soF3xEG0SOTOnlPkyOB6_PZKpb6A
```

#### Optional (Blockchain):
```bash
INFURA_PROJECT_ID=your_infura_project_id_here
BLOCKCHAIN_PRIVATE_KEY=your_private_key_here
CLIMATE_DATA_CONTRACT=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
CARBON_CREDITS_CONTRACT=0x1234567890123456789012345678901234567890
ENVIRONMENTAL_NFT_CONTRACT=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
DEFAULT_NETWORK=sepolia
```

### 3.2 How to Add Each Variable:
1. Click "Add Environment Variable"
2. Enter **Key** (e.g., `NODE_ENV`)
3. Enter **Value** (e.g., `production`)
4. Click "Add"
5. Repeat for all variables

---

## Phase 4: Deploy & Verify

### 4.1 Start Deployment
1. **Review Settings**: Double-check all configurations
2. **Create Web Service**: Click the blue "Create Web Service" button
3. **Wait for Build**: Render will:
   - Pull your code from GitHub
   - Run `npm install && npm run build`
   - Start your service with `npm start`

### 4.2 Monitor Deployment
**Build Logs**: Watch the real-time logs for:
```
✅ Cloning repository...
✅ Installing dependencies...
✅ Building TypeScript...
✅ Starting server...
🌍 Climate Platform Backend running on port 10000
✅ Database initialized successfully
```

### 4.3 Deployment Complete
Once you see `Your service is live`, your backend is deployed! 🎉

---

## Phase 5: Test Your Deployment

### 5.1 Get Your Service URL
Your backend will be available at:
```
https://climate-platform-backend-XXXX.onrender.com
```
(Render generates the XXXX part)

### 5.2 Test Health Check
Open in browser or use curl:
```
https://your-app-name.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Climate Platform Backend is running",
  "timestamp": "2025-08-19T..."
}
```

### 5.3 Test API Endpoints
Try these endpoints:
```
GET /api/environmental-data/nasa?lat=40.7589&lng=-73.9851
GET /api/environmental-data/forest-watch
GET /api/environmental-data/world-bank
GET /api/environmental-data/carbon-interface
GET /api/environmental-data/earth-engine
```

---

## Phase 6: Post-Deployment Configuration

### 6.1 Update CORS Origins
In your repository, update `src/server.ts`:
```typescript
origin: process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || '', 'https://your-actual-frontend.onrender.com'].filter(Boolean)
  : process.env.FRONTEND_URL || 'http://localhost:3000',
```

### 6.2 Update Environment Variables
In Render dashboard:
- Update `FRONTEND_URL` with your actual frontend URL
- Add any additional domains to CORS if needed

### 6.3 Enable Auto-Deploy
- **GitHub Integration**: Enable auto-deploy on push
- **Branch Protection**: Consider protecting main branch

---

## 🎯 Success Indicators

### ✅ Deployment Successful When:
1. **Build Completes**: No errors in build logs
2. **Server Starts**: See startup messages in logs
3. **Health Check**: `/health` returns 200 OK
4. **Database Connected**: Supabase connection successful
5. **APIs Working**: All climate endpoints respond

### 🚨 Troubleshooting Common Issues:

#### Build Fails:
- Check `package.json` scripts
- Verify Node.js version compatibility
- Check for TypeScript errors

#### Server Won't Start:
- Verify environment variables are set
- Check for missing dependencies
- Review server logs for errors

#### Database Issues:
- Verify Supabase credentials
- Check network connectivity
- Review database logs

---

## 🎊 You're Live!

Your Climate Platform Backend is now deployed and serving:
- ✅ 8 Climate APIs (all working)
- ✅ AI Chat functionality  
- ✅ Database operations
- ✅ Blockchain support
- ✅ Production security

**Next**: Deploy your frontend and connect it to this backend URL! 🚀
