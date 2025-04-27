import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import authRoutes from './routes/authRoutes.mjs';
import tokenVerification from './middleware/authMiddleware.mjs';
import taskRoutes from './routes/taskRoutes.mjs';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(
	cors({
		origin: [
            'http://localhost:5173'
			],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL) 
   
  .then(() => console.log(chalk.bold.bgGreen('MongoDB connected')))
  .catch((err) => console.error(chalk.bold.bgRed('Mongo Error:'), err));
  
// Start server
app.listen(PORT, () => {
  console.log((chalk.bold.bgYellow `Server running on http://localhost:${PORT}`));
});
