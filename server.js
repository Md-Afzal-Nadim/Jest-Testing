import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/dataBase.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
