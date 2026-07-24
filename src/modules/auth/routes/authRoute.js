const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const {
    registerValidation,
    loginValidation,
} = require("../validators/authValidator");

const validateRequest = require("../../../middleware/validateRequest");

/* ==============================
   Authentication Routes
============================== */

// Register
router.post(
    "/register",
    registerValidation,
    validateRequest,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidation,
    validateRequest,
    authController.login
);

// Refresh Access Token
router.post(
    "/refresh-token",
    authController.refreshAccessToken
);

// Logout
router.post(
    "/logout",
    authController.logout
);

// Get Current User
router.get(
    "/me",
    authController.getCurrentUser
);

module.exports = router;