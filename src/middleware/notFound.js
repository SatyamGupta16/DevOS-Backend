const STATUS_CODES = require("../constants/statusCodes");
const ApiError = require("../utils/apiError");

const notFound = (req, res, next) => {
    next(
        new ApiError(
            STATUS_CODES.NOT_FOUND,
            `Route Not Found - ${req.originalUrl}`
        )
    );
};

module.exports = notFound;