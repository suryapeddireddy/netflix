import User  from "../models/user.models.js";

// Generate access and refresh tokens
const getAccessandRefreshTokens = async (user) => {
  try {
    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateRefreshToken();
    return { AccessToken, RefreshToken };
  } catch (error) {
    return null;
  }
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const { AccessToken, RefreshToken } = await getAccessandRefreshTokens(newUser);

    // Save refresh token to cookies
    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(201).json({
      message: "User created successfully",
      token: AccessToken,
      user: { email: newUser.email, id: newUser._id },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user" });
  }
};

// Signin controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const { AccessToken, RefreshToken } = await getAccessandRefreshTokens(user);

    // Set refresh token in cookies
    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Login successful",
      token: AccessToken,
      user: { email: user.email, id: user._id },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    res.clearCookie("RefreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

// Get user info (requires authentication middleware)
const getuser = async (req, res) => {
  try {
    // Assuming `req.user` is set from auth middleware
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export { signin, signup, logout, getuser };
