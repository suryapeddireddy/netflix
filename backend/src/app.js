import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// CORS middleware (MUST be before any routes!)
// Configuration options for cors are set below
app.use(cors({
    origin: 'http://localhost:3001', // Or, dynamically set:  (req, callback) => { ... }
    credentials: true,          // Allow cookies, authorization headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Whitelist headers (important!)
    exposedHeaders: ['Set-Cookie'],       // Make 'Set-Cookie' header available to browser
    maxAge: 86400,                 // Optional: Preflight cache (in seconds) - 24 hours
}));

app.use(cookieParser());
// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import UserRoutes from './routes/user.routes.js';
app.use('/api/v1/users', UserRoutes);


app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err); // Log the error
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message, // Optionally send error details (for development)
    });
});

export default app;
