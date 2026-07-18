const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        /* ==============================
           Authentication
        ============================== */

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        /* ==============================
           Profile
        ============================== */

        bio: {
            type: String,
            default: "",
        },

        college: {
            type: String,
            default: "",
        },

        branch: {
            type: String,
            default: "",
        },

        graduationYear: {
            type: Number,
        },

        skills: [
            {
                type: String,
            },
        ],

        /* ==============================
           Social Links
        ============================== */

        githubUsername: {
            type: String,
            default: "",
        },

        leetcodeUsername: {
            type: String,
            default: "",
        },

        codeforcesUsername: {
            type: String,
            default: "",
        },

        linkedinUrl: {
            type: String,
            default: "",
        },

        portfolioUrl: {
            type: String,
            default: "",
        },

        /* ==============================
           Subscription
        ============================== */

        plan: {
            type: String,
            enum: ["free", "pro"],
            default: "free",
        },

        /* ==============================
           Account Status
        ============================== */

        isVerified: {
            type: Boolean,
            default: false,
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },

        /* ==============================
           Tokens
        ============================== */

        refreshToken: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;