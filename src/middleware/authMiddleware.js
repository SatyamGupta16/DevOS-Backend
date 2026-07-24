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

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "Access token is required"
        );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            "User not found"
        );
    }

    if (user.isBlocked) {
        throw new ApiError(
            STATUS_CODES.FORBIDDEN,
            "Your account has been blocked"
        );
    }

    req.user = user;

    next();
});

module.exports = protect;