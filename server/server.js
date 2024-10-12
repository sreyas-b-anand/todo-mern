import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import taskerRouter from './routes/taskerRoutes.js';
import cors from 'cors';
import userRoutes from './routes/user.js';

// Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow cookies and credentials if needed
}));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// MongoDB connection
mongoose.connect(process.env.DBURI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
    console.log('Database connected');
  })
  .catch(err => console.error('Database connection error:', err));

// API routes
app.use('/api/tasker', taskerRouter);
app.use('/api/user', userRoutes);


