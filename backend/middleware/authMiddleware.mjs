import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenVerification = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: 401, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user info (e.g., id, email)
    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};
export default tokenVerification