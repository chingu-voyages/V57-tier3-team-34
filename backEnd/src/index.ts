import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// SETTING UP CORS
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

// SET UP JSON PARSING FUNCTION
app.use(express.json());

// ROUTES
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
