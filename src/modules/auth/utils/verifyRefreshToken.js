const jwt = require("jsonwebtoken");

const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );
};

module.exports = verifyRefreshToken;