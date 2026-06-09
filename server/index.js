import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import channelsRouter from './routes/channels.js';
import streamRouter from './routes/stream.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/channels', channelsRouter);
app.use('/api/stream', streamRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Bangladesh Live Streaming API',
    version: '1.0.0',
    endpoints: {
      channels: '/api/channels',
      stream: '/api/stream',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
