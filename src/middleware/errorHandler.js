const STATUS_CODES = require("../constants/statusCodes");

const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;

    const message =
        err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};

module.exports = errorHandler;