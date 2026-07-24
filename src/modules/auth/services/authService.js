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
   Login User
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

module.exports = {
    registerUser,
    loginUser,
    getUserByEmail,
    getUserByUsername,
};