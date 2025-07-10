import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user data" });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }


    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}