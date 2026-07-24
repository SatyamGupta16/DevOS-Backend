const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES,
        }
    );
};

module.exports = generateAccessToken;