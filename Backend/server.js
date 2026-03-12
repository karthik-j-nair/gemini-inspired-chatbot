import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { response } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 8000;

response();

connectDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});