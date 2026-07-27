const STATUS_CODES = require("../../../constants/statusCodes");

const ApiResponse = require("../../../utils/apiResponse");
const ApiError = require("../../../utils/apiError");
const asyncHandler = require("../../../utils/asyncHandler");

const userService = require("../services/userService");

/* ==============================
   Create User
============================== */

const createUser = asyncHandler(async (req, res) => {
    const existingEmail = await userService.getUserByEmail(req.body.email);

    if (existingEmail) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            "Email already exists"
        );
    }

    const existingUsername = await userService.getUserByUsername(
        req.body.username
    );

    if (existingUsername) {
        throw new ApiError(
            STATUS_CODES.CONFLICT,
            "Username already exists"
        );
    }

    const user = await userService.createUser(req.body);

    return ApiResponse(
        res,
        STATUS_CODES.CREATED,
        "User created successfully",
        user
    );
});

/* ==============================
   Get All Users
============================== */

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Users fetched successfully",
        users
    );
});

/* ==============================
   Get User By ID
============================== */

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "User fetched successfully",
        user
    );
});

/* ==============================
   Update User
============================== */

const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(
        req.params.id,
        req.body
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "User updated successfully",
        user
    );
});

/* ==============================
   Delete User
============================== */

const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(
        req.params.id
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "User deleted successfully"
    );
});

/* ==============================
   Get Profile
============================== */

const getProfile = asyncHandler(async (req, res) => {
    const user = await userService.getProfile(
        req.user._id
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Profile fetched successfully",
        user
    );
});

/* ==============================
   Get Public Profile
============================== */

const getPublicProfile = asyncHandler(async (req, res) => {
    const user = await userService.getPublicProfile(
        req.params.username
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Profile fetched successfully",
        user
    );
});

/* ==============================
   Update Profile
============================== */

const updateProfile = asyncHandler(async (req, res) => {
    const user = await userService.updateProfile(
        req.user._id,
        req.body
    );

    if (!user) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "User not found"
        );
    }

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Profile updated successfully",
        user
    );
});

/* ==============================
   Search Users
============================== */

const searchUsers = asyncHandler(async (req, res) => {
    const { query = "" } = req.query;

    const users = await userService.searchUsers(query);

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Users fetched successfully",
        users
    );
});

/* ==============================
   Upload Avatar
============================== */

const uploadAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            "Please upload an image"
        );
    }

    const user = await userService.uploadAvatar(
        req.user._id,
        req.file.path
    );

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Avatar uploaded successfully",
        user
    );
});

/* ==============================
   Delete Avatar
============================== */

const deleteAvatar = asyncHandler(async (req, res) => {
    const user = await userService.deleteAvatar(
        req.user._id
    );

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Avatar deleted successfully",
        user
    );
});

const updateSocialLinks = asyncHandler(async (req, res) => {
    const user = await userService.updateSocialLinks(
        req.user._id,
        req.body
    );

    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "Social links updated successfully",
        user
    );
});

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,

    getProfile,
    getPublicProfile,
    updateProfile,

    searchUsers,

    uploadAvatar,
    deleteAvatar,

    updateSocialLinks,
};