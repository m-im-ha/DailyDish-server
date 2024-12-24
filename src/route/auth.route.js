const express = require("express");
const { generateToken } = require("../utils/jwt");
const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    // Generate JWT token
    const token = generateToken({ email });
    // Set token in HTTP-only cookie
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
