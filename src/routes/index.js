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

/* ==============================
   Module Routes
============================== */

// router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/dashboard", dashboardRoutes);
// router.use("/github", githubRoutes);
// router.use("/leetcode", leetcodeRoutes);
// router.use("/codeforces", codeforcesRoutes);
// router.use("/resume", resumeRoutes);
// router.use("/ai", aiRoutes);

module.exports = router;