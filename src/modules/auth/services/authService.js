const bcrypt = require("bcryptjs");

const User = require("../../user/models/userModel");

/* ==============================
   Register User
============================== */

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

/* ==============================
   Login User      http://localhost:27017/api/v1/auth/login
============================== */

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return null;
    }

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

/* ==============================
   Find User By Email
============================== */

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

/* ==============================
   Find User By Username
============================== */

const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};

/* ==============================
   Save Refresh Token
============================== */

const saveRefreshToken = async (userId, refreshToken) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            refreshToken,
        },
        {
            new: true,
        }
    );
};


/* ==============================
   Find User By ID
============================== */

const getUserById = async (id) => {
    return await User.findById(id);
};


/* ==============================
   Remove Refresh Token
============================== */

const removeRefreshToken = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            refreshToken: "",
        },
        {
            new: true,
        }
    );
};

const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    user.password = hashedPassword;

    await user.save();

    return true;

};

module.exports = {
    registerUser,
    loginUser,
    getUserByEmail,
    getUserByUsername,
    saveRefreshToken,
    getUserById,
    removeRefreshToken,
    changePassword,
};