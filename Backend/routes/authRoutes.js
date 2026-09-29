const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const loginLimiter = require("../middlewares/loginLimiter");

const router = express.Router();

// Signup: create an account
router.post(
  "/signup",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be 3-30 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("role")
      .optional()
      .isIn(["user", "admin"])
      .withMessage("Role must be user or admin"),
  ],
  authController.signup
);

// Login: authenticate user or admin
router.post(
  "/login",
  loginLimiter,
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  authController.login
);

// Current logged-in user
router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);

// Logout current user
router.post(
  "/logout",
  authMiddleware,
  authController.logout
);

module.exports = router;