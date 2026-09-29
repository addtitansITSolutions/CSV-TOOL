
const { rateLimit } = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 7, // Maximum 7 attempts per IP

  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(429).json({
      success: false,
      message:
        "Too many login attempts. Please try again after 10 minutes.",
    });
  },
});

module.exports = loginLimiter;