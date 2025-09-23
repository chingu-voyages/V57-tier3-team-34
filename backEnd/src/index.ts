import app from "@/app";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// SETTING UP CORS
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
