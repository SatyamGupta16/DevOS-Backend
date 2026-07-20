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

const validateRequest = require("./middleware/validateRequest");
const {
    registerValidation,
} = require("./modules/user/validators/userValidator");

const userService = require("./modules/user/services/userService");

const userController = require("./modules/user/controllers/userController");

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


app.post(
    "/test-validation",
    registerValidation,
    validateRequest,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Validation Passed ✅",
        });
    }
);
// http://localhost:27017/test-validation

app.get("/test-user-service", async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            message: "userService.js is working!",
            totalUsers: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
//GET http://localhost:27017/test-user-service

app.post("/test-create-user", async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        return ApiResponse(
            res,
            STATUS_CODES.CREATED,
            "User created successfully!",
            user
        );
    } catch (error) {
        return next(error);
    }
});
// POST http://localhost:27017/test-create-user

/* ==============================
   User Controller Test Routes
============================== */

app.post(
    "/test-controller/create-user",
    registerValidation,
    validateRequest,
    userController.createUser
);
//POST http://localhost:27017/test-controller/create-user

app.get(
    "/test-controller/users",
    userController.getAllUsers
);
//GET http://localhost:27017/test-controller/users

app.get(
    "/test-controller/user/:id",
    userController.getUserById
);
//GET http://localhost:27017/test-controller/user/<USER_ID>

app.put(
    "/test-controller/user/:id",
    userController.updateUser
);
//PUT http://localhost:27017/test-controller/user/<USER_ID>

app.delete(
    "/test-controller/user/:id",
    userController.deleteUser
);
//DELETE http://localhost:27017/test-controller/user/<USER_ID>

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