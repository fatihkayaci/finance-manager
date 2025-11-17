import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Kasa API is running!' });
});

export default app;