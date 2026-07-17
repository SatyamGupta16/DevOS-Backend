const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");

const STATUS_CODES = require("./constants/statusCodes");
const ApiResponse = require("./utils/apiResponse");

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
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: "🚀 DevOS Backend Running Successfully",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});


/* ==============================
   Test Route
============================== */

app.get("/test", (req, res) => {
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: "statusCodes.js is working!",
    });
});
// http://localhost:27017/test

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
// http://localhost:27017/test_apiResponse

/* ==============================
   404 Route Handler
============================== */

app.use((req, res) => {
    res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Route Not Found",
    });
});

module.exports = app;