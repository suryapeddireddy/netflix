import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const connectDB=async()=>{
return await mongoose.connect(process.env.URI);
}
export default connectDB;