const express = require("express");

const userRoute = require("./routes/userRoute");

const router = express.Router();

/* ==============================
   User Module Routes
============================== */

router.use("/", userRoute);

module.exports = router;