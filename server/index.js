import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import weeklyTaskRoutes from './routes/weeklyTaskRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './src/db/connect.js';



dotenv.config();

const app = express();

const clientUrl = process.env.CLIENT_URL;

app.use(express.json());
app.use(clientUrl ? cors({ origin: clientUrl }) : cors());
app.use('/uploads', express.static('uploads'));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});


app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/task', taskRoutes);
app.use('/api', weeklyTaskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/user', userRoutes);



connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })

  .catch((err) => console.error('Mongo connection error:', err));

