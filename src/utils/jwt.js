const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Read JWT token from cookies

  // Check if token exists
  if (!token) {
    console.log("No token provided! Unauthorized access.");
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    console.log("Verified User:", decoded.email);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Forbidden access!" });
  }
}


module.exports = { generateToken, verifyToken };
