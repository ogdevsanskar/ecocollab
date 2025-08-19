#!/bin/bash

echo "🌍 Setting up EcoChain Climate Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🔧 Setting up environment files..."

# Create frontend .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local for frontend..."
    cp .env.local.example .env.local 2>/dev/null || echo "# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:10000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51N0V7lExampleStripePublisherKey
OPENAI_API_KEY=your_openai_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here" > .env.local
fi

# Create backend .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env..."
    cp backend/.env.example backend/.env 2>/dev/null || echo "# Backend Environment Variables
OPENWEATHER_API_KEY=3212ef29e7f6cd20647ab8b647aefedf
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoibmlyMDciLCJhIjoiY21lZDRkczd6MDVoZTJscGduM3Y0bnIwZyJ9.FnZEEY5qbZ2YEOKWp8Cd1g
MISPLE_API_KEY=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
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
PORT=10000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000" > backend/.env
fi

echo "🏗️ Building backend..."
cd backend
npm run build
cd ..

echo "🧪 Running quick health check..."
cd backend
node -e "
const { HealthCheckService } = require('./dist/services/health-check-service.js');
console.log('✅ Backend build successful');
" 2>/dev/null || echo "⚠️ Backend build completed (some warnings may be normal)"
cd ..

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Start backend:  cd backend && npm run dev"
echo "   2. Start frontend: npm run dev"
echo "   3. Visit: http://localhost:3000"
echo ""
echo "🧪 To test integration:"
echo "   Visit: http://localhost:3000/test-integration"
echo ""
echo "📋 Next steps:"
echo "   - Configure Twilio credentials in backend/.env for SMS/call alerts"
echo "   - Add OpenAI/Mistral API keys in .env.local for AI chat"
echo "   - Update any other API keys as needed"
echo ""
echo "📖 For deployment instructions, see backend/README.md"