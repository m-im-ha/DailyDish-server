const express = require("express");
const { generateToken, verifyToken } = require("../utils/jwt");
const router = express.Router();


// Verify JWT Token
router.get("/verify", verifyToken, (req, res) => {
  // console.log("Verify Route Hit!");
  // console.log("Cookies:", req.cookies);
  // console.log("Decoded User:", req.user);

  try {
    const email = req.user.email;
    // console.log("Verified Email:", email);
    return res.status(200).json({ email });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// Generate JWT Token
router.post("/jwt", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const token = generateToken({ email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, message: "Token created!" });
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(500).json({ message: "Failed to create token." });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a new JWT token for the user
    const token = generateToken({ email });

    // Clear any existing cookie first
    res.clearCookie("token");

    // Set the new token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: "Failed to login." });
  }
});


// Google Login Route
router.post("/google-login", async (req, res) => {
  const { email } = req.body;

  try {
    const token = generateToken({ email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });
    return res.status(200).json({ message: "Google Login successful!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login with Google." });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
 
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  return res.status(200).json({ message: "Logged out!" });
});

module.exports = router;
