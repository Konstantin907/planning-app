import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import weeklyTaskRoutes from './routes/weeklyTaskRoutes.js';
import eventRoutes from './routes/eventRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/task', taskRoutes);
app.use('/api', weeklyTaskRoutes);
app.use('/api/events', eventRoutes);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('✅ Mongo connected!');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ Mongo connection error:', err));
