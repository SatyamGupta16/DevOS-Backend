const bcrypt = require("bcryptjs");

const User = require("../../user/models/userModel");

/* ==============================
   Register User
============================== */

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    return user;
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

    return user;
};

/* ==============================
   Find User By Email
============================== */

const getUserByEmail = async (email) => {
    console.log("Searching Email :", email);

    const user = await User.findOne({ email });

    console.log("Found Email :", user);

    return user;
};

/* ==============================
   Find User By Username
============================== */

const getUserByUsername = async (username) => {
    console.log("Searching Username :", username);

    const user = await User.findOne({ username });

    console.log("Found Username :", user);

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getUserByEmail,
    getUserByUsername,
};