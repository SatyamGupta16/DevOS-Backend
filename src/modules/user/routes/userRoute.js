const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const {
    registerValidation,
    updateProfileValidation,
} = require("../validators/userValidator");

const validateRequest = require("../../../middleware/validateRequest");

const protect = require("../../../middleware/authMiddleware");

/* ==============================
   Profile Routes (Protected)
============================== */

// Get Current User Profile
router.get(
    "/profile",
    protect,
    userController.getProfile
);

// Update Current User Profile
router.put(
    "/profile",
    protect,
    updateProfileValidation,
    validateRequest,
    userController.updateProfile
);

/* ==============================
   Create User
============================== */

router.post(
    "/",
    registerValidation,
    validateRequest,
    userController.createUser
);

/* ==============================
   Get All Users
============================== */

router.get(
    "/",
    userController.getAllUsers
);

/* ==============================
   Get User By ID
============================== */

router.get(
    "/:id",
    userController.getUserById
);

/* ==============================
   Update User
============================== */

router.put(
    "/:id",
    updateProfileValidation,
    validateRequest,
    userController.updateUser
);

/* ==============================
   Delete User
============================== */

router.delete(
    "/:id",
    userController.deleteUser
);

module.exports = router;