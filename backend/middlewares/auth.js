import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Check for token in cookies first, then in Authorization header
  let token = req.cookies.token;
  
  if (!token) {
    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }
  
  console.log("Incoming cookies:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);
  console.log("Token found:", !!token);

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};