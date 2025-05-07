import User from "../models/user.models.js";

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
      secure: true,
      sameSite: "Lax", // Better for dev with CORS; use "Strict" in production
    });

    return res.status(201).json({
      message: "User created successfully",
      token: accessToken,
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

// @desc    Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const { accessToken, refreshToken } = await getAccessAndRefreshTokens(user);

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax", // Looser CORS for localhost
    });

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

// @desc    Logout
const logout = (req, res) => {
  try {
    res.clearCookie("RefreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

// @desc    Get current user
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export { signup, signin, logout, getuser };
