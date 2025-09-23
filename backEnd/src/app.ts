import express from "express";
import type { Request, Response } from "express";
import userRouter from "@routes/voterRoute";

const app = express();

// SET UP JSON PARSING FUNCTION
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) =>
  res.status(201).json({
    success: true,
    data: { app_version: "1.0.0", app_name: "v57-team-34-e-voting Tier 3" },
  })
);
app.use("/voter", userRouter);

export default app;
