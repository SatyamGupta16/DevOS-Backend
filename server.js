const dotenv = require("dotenv");

dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`
==========================================
🚀 DevOS Backend Started Successfully
🌍 Environment : ${process.env.NODE_ENV}
📡 Server      : http://localhost:${PORT}
==========================================
`);
        });
    } catch (error) {
        console.error("❌ Server startup failed");
        console.error(error);
        process.exit(1);
    }
};

startServer();