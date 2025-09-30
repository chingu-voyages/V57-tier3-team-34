import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import userRouter from "@/routes/UserRoutes";
import candidatesRouter from "@/routes/party/Candidate";
import extrasRouter from "@/routes/ExtraRoutes";
const app = express();

//Config Cors
app.use(cors());

// SET UP JSON PARSING FUNCTION
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) =>
  res.status(201).json({
    success: true,
    data: { app_version: "1.0.0", app_name: "v57-team-34-e-voting Tier 3" },
  })
);

app.use("/user", userRouter);
app.use("/party", candidatesRouter);
app.use("/extras", extrasRouter);

export default app;
