const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");

const STATUS_CODES = require("./constants/statusCodes");
const ApiResponse = require("./utils/apiResponse");
const ApiError = require("./utils/apiError");

const routes = require("./routes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const User = require("./modules/user/models/userModel");

const app = express();

/* ==============================
   Global Middlewares
============================== */

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(hpp());

/* ==============================
   Health Check Route
============================== */

app.get("/", (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "🚀 DevOS Backend Running Successfully",
        {
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
        }
    );
});

/* ==============================
   Test Routes
============================== */

app.get("/test", (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "statusCodes.js is working!"
    );
});

app.get("/test_apiResponse", (req, res) => {
    return ApiResponse(
        res,
        STATUS_CODES.OK,
        "apiResponse.js is working!",
        {
            project: "DevOS",
            version: "1.0.0",
        }
    );
});

app.get("/error-test", (req, res, next) => {
    next(
        new ApiError(
            STATUS_CODES.BAD_REQUEST,
            "Testing Global Error Handler"
        )
    );
});

app.get("/test-user-model", async (req, res) => {
    try {
        const user = new User({
            fullName: "Satyam Gupta",
            username: "satyam16",
            email: "satyam@example.com",
            password: "password123",
        });

        res.status(200).json({
            success: true,
            message: "userModel.js is working!",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// http://localhost:27017/test-user-model

/* ==============================
   API Routes
============================== */

app.use("/api/v1", routes);

/* ==============================
   Global Error Handlers
============================== */

app.use(notFound);

app.use(errorHandler);

module.exports = app;