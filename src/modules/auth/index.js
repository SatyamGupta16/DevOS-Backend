const express = require("express");

const authRoute = require("./routes/authRoute");

const router = express.Router();

/* ==============================
   Auth Module Routes
============================== */

router.use("/", authRoute);

module.exports = router;