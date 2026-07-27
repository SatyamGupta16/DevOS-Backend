const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const {
    registerValidation,
    updateProfileValidation,
} = require("../validators/userValidator");

const validateRequest = require("../../../middleware/validateRequest");
const protect = require("../../../middleware/authMiddleware");
const upload = require("../../../middleware/uploadMiddleware");

/* =====================================
   Protected Profile Routes
===================================== */

router.get(
    "/profile",
    protect,
    userController.getProfile
);

router.put(
    "/profile",
    protect,
    updateProfileValidation,
    validateRequest,
    userController.updateProfile
);

/* =====================================
   Avatar Routes (Must be before /:id)
===================================== */

router.post(
    "/avatar",
    protect,
    upload.single("avatar"),
    userController.uploadAvatar
);

router.delete(
    "/avatar",
    protect,
    userController.deleteAvatar
);

/* =====================================
   Public Profile
===================================== */

router.get(
    "/profile/:username",
    userController.getPublicProfile
);

/* =====================================
   Social Links (Protected)
===================================== */

router.put(
    "/socials",
    protect,
    userController.updateSocialLinks
);

/* =====================================
   Search Users
===================================== */

router.get(
    "/search",
    userController.searchUsers
);

/* =====================================
   Create User
===================================== */

router.post(
    "/",
    registerValidation,
    validateRequest,
    userController.createUser
);

/* =====================================
   Get All Users
===================================== */

router.get(
    "/",
    userController.getAllUsers
);

/* =====================================
   User By ID (Keep LAST)
===================================== */

router.get(
    "/:id",
    userController.getUserById
);

router.put(
    "/:id",
    updateProfileValidation,
    validateRequest,
    userController.updateUser
);

router.delete(
    "/:id",
    userController.deleteUser
);

module.exports = router;