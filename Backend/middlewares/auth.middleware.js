// const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");

// const authMiddleware = async (req, res, next) => {
//   try {

//     const token =
//       req.cookies?.token ||
//       req.headers.authorization?.split(" ")[1];          // Bearer tokenn

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized. Please login."
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     req.user = user;

//     next();

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token"
//     });
//   }
// };

// module.exports = authMiddleware;










const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify that the user is authenticated
async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1] ;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    // Verify JWT signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in MongoDB
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account is unavailable. Please log in again.",
      });
    }

    // Attach the current database user to the request
    req.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }

    console.error("Authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
}

// Allow only admins
function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
}

module.exports = authMiddleware;
module.exports.adminMiddleware = adminMiddleware;