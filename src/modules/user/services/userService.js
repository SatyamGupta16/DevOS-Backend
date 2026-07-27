const User = require("../models/userModel");

/* ==============================
   Create User
============================== */

const createUser = async (userData) => {
    return await User.create(userData);
};

/* ==============================
   Get User By ID
============================== */

const getUserById = async (userId) => {
    return await User.findById(userId).select(
        "-password -refreshToken"
    );
};

/* ==============================
   Get User By Email
============================== */

const getUserByEmail = async (email) => {
    return await User.findOne({ email }).select(
        "-password -refreshToken"
    );
};

/* ==============================
   Get User By Username
============================== */

const getUserByUsername = async (username) => {
    return await User.findOne({ username }).select(
        "-password -refreshToken"
    );
};

/* ==============================
   Get All Users
============================== */

const getAllUsers = async () => {
    return await User.find().select(
        "-password -refreshToken"
    );
};

/* ==============================
   Search Users              http://localhost:27017/api/v1/users/search?query=satyam
============================== */

const searchUsers = async (query) => {
    return await User.find({
        $or: [
            {
                fullName: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                username: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: query,
                    $options: "i",
                },
            },
        ],
    }).select("-password -refreshToken");
};

/* ==============================
   Update User
============================== */

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

/* ==============================
   Delete User
============================== */

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

/* ==============================
   Get Profile
============================== */

const getProfile = async (userId) => {
    return await User.findById(userId).select(
        "-password -refreshToken"
    );
};

/* ==============================
   Get Public Profile
============================== */

const getPublicProfile = async (username) => {
    return await User.findOne({ username }).select(
        "-password -refreshToken"
    );
};

/* ==============================
   Update Profile
============================== */

const updateProfile = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

/* ==============================
   Upload Avatar
============================== */

const uploadAvatar = async (userId, avatarUrl) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            avatar: avatarUrl,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

/* ==============================
   Delete Avatar
============================== */

const deleteAvatar = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            avatar: "",
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");
};

/* ==============================
   Update Social Links
============================== */

const updateSocialLinks = async (userId, socialData) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            githubUsername: socialData.githubUsername,
            leetcodeUsername: socialData.leetcodeUsername,
            codeforcesUsername: socialData.codeforcesUsername,
            linkedinUrl: socialData.linkedinUrl,
            portfolioUrl: socialData.portfolioUrl,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getAllUsers,
    searchUsers,
    updateUser,
    deleteUser,
    getProfile,
    getPublicProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    updateSocialLinks,
};