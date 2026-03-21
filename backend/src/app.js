import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongoDB.js';
import userRoutes from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config({ path: '../.env' });
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);



export default app; 