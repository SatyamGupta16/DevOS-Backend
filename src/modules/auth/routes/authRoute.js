const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const validateRequest = require("../../../middleware/validateRequest");

const protect = require("../../../middleware/authMiddleware");

const {
    registerValidation,
    loginValidation,
    changePasswordValidation,
} = require("../validators/authValidator");

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

router.put(
    "/change-password",
    protect,
    changePasswordValidation,
    validateRequest,
    authController.changePassword
);

// Logout (Protected)
router.post(
    "/logout",
    protect,
    authController.logout
);


// Get Current User (Protected)
router.get(
    "/me",
    protect,
    authController.getCurrentUser
);


module.exports = router;