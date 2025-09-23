import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import voterRouter from "./routes/voterRoute";

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// SETTING UP CORS
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

// SET UP JSON PARSING FUNCTION
app.use(express.json());

// ROUTES
app.use("/voter", voterRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
