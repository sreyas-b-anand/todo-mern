import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import taskerRouter from './routes/taskerRoutes.js';
import cors from 'cors'; // If you're using CORS, ensure it's imported here.
import userRoutes from './routes/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

// DB
mongoose.connect(process.env.DBURI)
  .then(result => {
    app.listen(process.env.PORT);
    console.log('connected');
  })
  .catch(err => console.log(err));

console.log(process.env.PORT);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// Listen
app.use('/api/tasker', taskerRouter);
app.use('/api/user', userRoutes);
