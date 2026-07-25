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

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getAllUsers,
    updateUser,
    deleteUser,

    getProfile,
    updateProfile,
};