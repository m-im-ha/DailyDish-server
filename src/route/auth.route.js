const express = require("express");
const { generateToken, verifyToken } = require("../utils/jwt");
const router = express.Router();

// Verify JWT Token
router.get("/verify", verifyToken, (req, res) => {
    try {
      const email = req.user.email; // Extract email from the verified token
      res.status(200).json({ email });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

// Generate JWT Token
router.post("/jwt", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Generate token
    const token = generateToken({ email });

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Token created!" });
  } catch (error) {
    console.error("JWT creation error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to create token." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    // Generate JWT token
    const token = generateToken({ email });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to login." });
  }
});

// Google Login Route
router.post("/google-login", async (req, res) => {
  const { email } = req.body;

  try {
    const token = generateToken({ email });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Google Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to login with Google." });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out!" });
});

module.exports = router;
