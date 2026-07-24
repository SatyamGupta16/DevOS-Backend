const STATUS_CODES = require("../constants/statusCodes");

const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");

const User = require("../modules/user/models/userModel");

const verifyAccessToken = require("../modules/auth/utils/verifyAccessToken");


/* ==============================
   Authentication Middleware
============================== */

const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;


    // Check Authorization Header
    if (!authHeader) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "Authorization header missing"
        );
    }


    // Check Bearer Format
    const parts = authHeader.split(" ");


    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "Invalid authorization format. Use Bearer <token>"
        );
    }


    const token = parts[1];


    // Verify JWT
    const decoded = verifyAccessToken(token);


    // Find User
    const user = await User.findById(decoded.id)
        .select("-password -refreshToken");


    if (!user) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "User not found"
        );
    }


    // Blocked Account Check
    if (user.isBlocked) {
        throw new ApiError(
            STATUS_CODES.FORBIDDEN,
            "Your account has been blocked"
        );
    }


    // Attach User
    req.user = user;


    next();

});


module.exports = protect;