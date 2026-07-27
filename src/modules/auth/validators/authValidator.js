const { body } = require("express-validator");

/* ==============================
   Register Validation
============================== */

const registerValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full Name must be between 3 and 50 characters"),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters")
        .isAlphanumeric()
        .withMessage(
            "Username must contain only letters and numbers"
        ),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage(
            "Password must be at least 8 characters long"
        )
        .matches(/[A-Z]/)
        .withMessage(
            "Password must contain at least one uppercase letter"
        )
        .matches(/[a-z]/)
        .withMessage(
            "Password must contain at least one lowercase letter"
        )
        .matches(/[0-9]/)
        .withMessage(
            "Password must contain at least one number"
        )
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage(
            "Password must contain at least one special character"
        ),
];

/* ==============================
   Login Validation
============================== */

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

const changePasswordValidation = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/)
        .withMessage("Must contain uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Must contain lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Must contain number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Must contain special character"),
];

module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
};