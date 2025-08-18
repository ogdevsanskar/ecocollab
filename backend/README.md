# Climate Platform Backend

This is the backend API for the Climate Platform, built with Node.js, Express, and TypeScript.

## Features

- 🚀 RESTful API with Express.js
- 🤖 AI-powered chat with OpenAI/Mistral integration
- 🌍 Environmental data aggregation from multiple sources
- 🔐 Security with Helmet and CORS
- 📊 Integration with external APIs:
  - Global Forest Watch (deforestation data)
  - OpenWeather (weather and air pollution)
  - NASA Earth Data (satellite imagery)
  - Mapbox (geocoding and maps)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# API Keys
OPENAI_API_KEY=your_openai_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
GLOBAL_FOREST_WATCH_API_KEY=your_gfw_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

### Development

Start the development server:

```bash
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

### Build and Production

```bash
npm run build
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── server.ts          # Main server file
│   ├── routes/            # API routes
│   │   ├── ai-chat.ts    # AI chat endpoints
│   │   └── environmental-data.ts # Environmental data endpoints
│   ├── services/          # External API services
│   │   └── api-services.ts
│   ├── config/            # Configuration files
│   │   └── api-config.ts
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   └── types/            # TypeScript type definitions
├── dist/                  # Compiled JavaScript (generated)
└── package.json
```

## API Endpoints

### Health Check
- `GET /health` - API health status

### AI Chat
- `POST /api/ai-chat` - Send message to AI assistant
  ```json
  {
    "message": "Tell me about climate projects",
    "history": []
  }
  ```

### Environmental Data
- `GET /api/environmental-data?type=all` - Get all environmental data
- `GET /api/environmental-data?type=deforestation` - Get deforestation alerts
- `GET /api/environmental-data?type=coral` - Get coral reef health data
- `GET /api/environmental-data?type=plastic` - Get plastic waste data
- `GET /api/environmental-data?type=emissions` - Get emissions data

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (default: 5000) |
| `FRONTEND_URL` | Frontend URL for CORS | No |
| `OPENAI_API_KEY` | OpenAI API key | Optional |
| `MISTRAL_API_KEY` | Mistral AI API key | Optional |
| `GLOBAL_FOREST_WATCH_API_KEY` | Global Forest Watch API key | Optional |
| `OPENWEATHER_API_KEY` | OpenWeather API key | Optional |
| `MAPBOX_ACCESS_TOKEN` | Mapbox access token | Optional |

## External APIs

### Global Forest Watch
Provides deforestation alerts and forest change data.

### OpenWeather
Provides weather data and air pollution information.

### NASA Earth Data
Provides satellite imagery and climate data.

### AI Services
- **OpenAI GPT-4** - Primary AI assistant
- **Mistral AI** - Fallback AI assistant

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Error Handling

The API includes comprehensive error handling:
- Validation errors return 400 status
- Authentication errors return 401 status
- Not found errors return 404 status
- Server errors return 500 status

## Security

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - API rate limiting (can be added)
- **Input validation** - Request validation (can be enhanced)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request
