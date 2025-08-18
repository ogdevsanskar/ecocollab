import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import aiChatRoutes from './routes/ai-chat';
import environmentalDataRoutes from './routes/environmental-data';
import blockchainRoutes from './routes/blockchain';
import databaseRoutes from './routes/database';

// Import database config
import { initializeDatabase } from './config/database-config';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000; // Render uses port 10000

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openweathermap.org", "https://hjeyadnplpjgmxpvahdi.supabase.co"]
    }
  }
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || '', 'https://your-frontend-domain.onrender.com'].filter(Boolean)
    : process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/environmental-data', environmentalDataRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/database', databaseRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Climate Platform Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🌍 Climate Platform Backend running on port ${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`📊 Health check: ${process.env.NODE_ENV === 'production' ? 'https://your-app-name.onrender.com' : 'http://localhost:' + PORT}/health`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize database connection asynchronously (don't block server startup)
  initializeDatabase()
    .then(() => {
      console.log('🎉 Database initialized successfully');
    })
    .catch((error) => {
      console.error('🔥 Failed to initialize database:', error);
      console.log('⚠️  Server will continue running without database features');
    });
});

export default app;
