# Climate Platform - Full Stack Application

A comprehensive climate monitoring and action platform with separate frontend and backend architectures.

## 🏗️ Project Structure

This project has been separated into two main parts:

```
climate-platform/
├── frontend/           # Next.js React application
│   ├── app/           # Next.js pages and layouts
│   ├── components/    # React components
│   ├── lib/           # Utilities and API client
│   └── public/        # Static assets
├── backend/           # Node.js Express API
│   ├── src/
│   │   ├── routes/    # API endpoints
│   │   ├── services/  # External API integrations
│   │   └── config/    # Configuration files
│   └── dist/          # Compiled JavaScript
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### 1. Start the Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure your API keys in .env
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000)

### 2. Start the Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

## 🌟 Features

### Frontend
- 🌍 Interactive climate dashboard
- 📊 Environmental data visualization
- 🗺️ Satellite imagery and mapping
- 🤖 AI-powered climate assistant
- 📱 Responsive design with dark/light themes
- ⚡ Built with Next.js 15 and React 19

### Backend
- 🚀 RESTful API with Express.js
- 🤖 AI integration (OpenAI/Mistral)
- 🌍 Environmental data aggregation
- 📡 External API integrations:
  - Global Forest Watch
  - OpenWeather
  - NASA Earth Data
  - Mapbox

## 📋 API Endpoints

- `GET /health` - Backend health check
- `POST /api/ai-chat` - AI assistant chat
- `GET /api/environmental-data` - Environmental data with filtering

## 🔧 Configuration

### Backend Environment Variables
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_key_here
MISTRAL_API_KEY=your_key_here
GLOBAL_FOREST_WATCH_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
MAPBOX_ACCESS_TOKEN=your_token_here
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev     # Start with nodemon
npm run build   # Compile TypeScript
npm run lint    # Run ESLint
```

### Frontend Development
```bash
cd frontend
npm run dev     # Start Next.js dev server
npm run build   # Build for production
npm run lint    # Run ESLint
```

## 📦 Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🔒 Security Features

- CORS configuration
- Helmet security headers
- Environment variable protection
- Input validation
- Error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check the individual README files in `/frontend` and `/backend` directories
- Review the API documentation
- Check environment variable configuration

---

**Note**: This separation allows for:
- Independent scaling of frontend and backend
- Different deployment strategies
- Technology stack flexibility
- Better separation of concerns
- Easier maintenance and development
