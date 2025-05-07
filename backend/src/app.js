import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// CORS middleware (MUST be before any routes!)
app.use(cors({
  origin: "http://localhost:3001", // Your frontend
  credentials: true,              // Required for cookies and Authorization headers
}));

app.use(cookieParser());
// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import UserRoutes from './routes/user.routes.js';
app.use('/api/v1/users', UserRoutes);

export default app;
