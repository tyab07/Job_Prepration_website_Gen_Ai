import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongoDB.js';
import userRoutes from './routes/userRoute.js';
dotenv.config({ path: '../.env' });
const app = express();
connectDB();
app.use(express.json());



export default app; 