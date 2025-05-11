import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

// Helper to generate access & refresh tokens
const getAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Failed to generate tokens");
    }
};

// @desc    Signup
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        const { accessToken, refreshToken } = await getAccessAndRefreshTokens(newUser);

        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use 'true' in production
            sameSite: "Lax", // Or "Strict" in production, but "Lax" for local testing
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            message: "User created successfully",
            token: accessToken,
            user: { id: newUser._id, email: newUser.email },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Failed to create user", error: error.message }); // Include error message
    }
};

// @desc    Signin
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" }); // Use 401 for authentication failures

        const { accessToken, refreshToken } = await getAccessAndRefreshTokens(user);

        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Use 'true' in production
            sameSite: "Lax",  // Or "Strict" in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            message: "Login successful",
            token: accessToken,
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ message: "Login failed", error: error.message });  // Include error
    }
};

// @desc    Logout
const logout = (req, res) => {
    try {
        res.clearCookie("RefreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use true in production
            sameSite: "Lax", // Or "Strict"
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Logout failed", error: error.message }); // Include error
    }
};

// @desc    Get current user
const getuser = async (req, res) => {
    try {
        //  Use req.user, which should be populated by your authentication middleware
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" }); //  404
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({ message: "Error fetching user", error: error.message }); // Include error
    }
};

export { signup, signin, logout, getuser };
