const { body } = require("express-validator");

/* ==============================
   Register Validation
============================== */

const registerValidation = [
    body("fullName")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Full Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full Name must be between 3 and 50 characters"),

    body("username")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can contain only letters, numbers and underscore"
        ),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character"),
];

/* ==============================
   Login Validation
============================== */

const loginValidation = [
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

/* ==============================
   Update Profile Validation
============================== */

const updateProfileValidation = [
    body("fullName")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 50 })
        .withMessage("Full Name must be between 3 and 50 characters"),

    body("bio")
        .optional()
        .trim()
        .escape()
        .isLength({ max: 250 })
        .withMessage("Bio cannot exceed 250 characters"),

    body("portfolioUrl")
        .optional()
        .trim()
        .isURL()
        .withMessage("Invalid Portfolio URL"),

    body("linkedinUrl")
        .optional()
        .trim()
        .isURL()
        .withMessage("Invalid LinkedIn URL"),

    body("githubUrl")
        .optional()
        .trim()
        .isURL()
        .withMessage("Invalid GitHub URL"),
];

/* ==============================
   Change Password Validation
============================== */

const changePasswordValidation = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current Password is required"),

    body("newPassword")
        .notEmpty()
        .withMessage("New Password is required")
        .isLength({ min: 8 })
        .withMessage("New Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("New Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("New Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("New Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage(
            "New Password must contain at least one special character"
        ),
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
};