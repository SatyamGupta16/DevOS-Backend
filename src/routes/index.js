const express = require("express");

const router = express.Router();

/* ==============================
   API Health Check
============================== */

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 DevOS API v1",
    });
});
// GET http://localhost:27017/api/v1

/* ==============================
   Module Routes
============================== */

router.use("/users", require("../modules/user"));

router.use("/auth", require("../modules/auth"));
// router.use("/dashboard", require("../modules/dashboard"));
// router.use("/github", require("../modules/github"));
// router.use("/leetcode", require("../modules/leetcode"));
// router.use("/codeforces", require("../modules/codeforces"));
// router.use("/resume", require("../modules/resume"));
// router.use("/ai", require("../modules/ai"));
// router.use("/analytics", require("../modules/analytics"));
// router.use("/community", require("../modules/community"));
// router.use("/notification", require("../modules/notification"));
// router.use("/billing", require("../modules/billing"));
// router.use("/settings", require("../modules/settings"));
// router.use("/admin", require("../modules/admin"));

module.exports = router;