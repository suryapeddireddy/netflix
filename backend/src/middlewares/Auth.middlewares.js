import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import dotenv from 'dotenv';
dotenv.config();

const VerifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.RefreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "User Unauthorized - No Refresh Token" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error("Refresh Token Verification Error:", err);
        return res.status(403).json({ message: "Invalid Refresh Token" }); // 403 Forbidden for invalid token
      }

      if (!decoded?.id) {
        return res.status(400).json({ message: "Invalid Refresh Token Payload" });
      }

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // Attach user information to the request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error("Refresh Token Verification Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error - Refresh Token Verification Failed", error: error.message });
  }
};

export default VerifyRefreshToken;