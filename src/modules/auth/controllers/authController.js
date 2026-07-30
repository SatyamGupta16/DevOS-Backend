const STATUS_CODES = require("../../../constants/statusCodes");

const ApiResponse = require("../../../utils/apiResponse");
const ApiError = require("../../../utils/apiError");
const asyncHandler = require("../../../utils/asyncHandler");

const authService = require("../services/authService");

const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const sendEmail = require("../../../utils/sendEmail");

/* ==============================
   Register
============================== */

const register = asyncHandler(async (req, res) => {
    console.log("\n========== AUTH REGISTER ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("===================================\n");

    const { fullName, username, email, password } = req.body;

    const existingEmail = await authService.getUserByEmail(email);

    if (existingEmail) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            "Email already exists"
        );
    }

    const existingUsername =
        await authService.getUserByUsername(username);

    if (existingUsername) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            "Username already exists"
        );
    }

    const user = await authService.registerUser({
        fullName,
        username,
        email,
        password,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save Refresh Token
    await authService.saveRefreshToken(
        user._id,
        refreshToken
    );

    return ApiResponse(
        res,
        STATUS_CODES.CREATED,
        "User registered successfully",
        {
            user,
            accessToken,
            refreshToken,
        }
    );
});

/* ==============================
   Login
============================== */

const login = asyncHandler(async (req, res) => {
    console.log("\n========== AUTH LOGIN ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("================================\n");

    const { email, password } = req.body;

    const user = await authService.loginUser(
        email,
        password
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "Invalid email or password"
        );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save Refresh Token
    await authService.saveRefreshToken(
        user._id,
        refreshToken
    );

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Login successful",
        {
            user,
            accessToken,
            refreshToken,
        }
    );
});

/* ==============================
   Refresh Access Token
============================== */

const refreshAccessToken = asyncHandler(async (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Refresh Token API (Coming Soon)"
    );
});

/* ==============================
   Logout                http://localhost:27017/api/v1/auth/logout
============================== */

const logout = asyncHandler(async (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Logout Successful"
    );
});

/* ==============================
   Current User
============================== */

const getCurrentUser = asyncHandler(async (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Current User",
        req.user
    );
});

const changePassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword } = req.body;

    await authService.changePassword(
        req.user._id,
        currentPassword,
        newPassword
    );

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Password changed successfully"
    );

});

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    getCurrentUser,
    changePassword,
};