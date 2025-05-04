import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
const app=express();

app.use(cors({
 origin:process.env.ORIGIN,
 credentials:true   
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
import UserRoutes from './routes/user.routes.js'
app.use('/api/v1/users',UserRoutes);
export default app;
