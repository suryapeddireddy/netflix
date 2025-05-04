import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import dotenv from 'dotenv';
dotenv.config();
const VerifyJWt=async(req,res,next)=>{
try {
const token=req.cookies?.RefreshToken;
if(!token){
return res.status(401).json({message:"User Unauthorized"});
}
const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
const user=await User.findById(decoded.id).select('-password');
if(!user){
return res.status(404).json({message:"User not found"});
}
req.user=user;
next();
} catch (error) {
return res.status(500).json({});    
}
}
export default VerifyJWt;