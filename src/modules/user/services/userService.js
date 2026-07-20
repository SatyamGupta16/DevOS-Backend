const User = require("../models/userModel");

/* ==============================
   Create User
============================== */

const createUser = async (userData) => {
    const user = await User.create(userData);

    return user;
};

/* ==============================
   Get User By ID
============================== */

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    return user;
};

/* ==============================
   Get User By Email
============================== */

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    return user;
};

/* ==============================
   Get User By Username
============================== */

const getUserByUsername = async (username) => {
    const user = await User.findOne({ username });

    return user;
};

/* ==============================
   Get All Users
============================== */

const getAllUsers = async () => {
    const users = await User.find();

    return users;
};

/* ==============================
   Update User
============================== */

const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    return user;
};

/* ==============================
   Delete User
============================== */

const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    return user;
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getAllUsers,
    updateUser,
    deleteUser,
};