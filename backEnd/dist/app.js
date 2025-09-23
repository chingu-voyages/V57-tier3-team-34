"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("@/routes/UserRoutes"));
const app = (0, express_1.default)();
// SET UP JSON PARSING FUNCTION
app.use(express_1.default.json());
// ROUTES
app.get("/", (req, res) => res.status(201).json({
    success: true,
    data: { app_version: "1.0.0", app_name: "v57-team-34-e-voting Tier 3" },
}));
app.use("/user", UserRoutes_1.default);
exports.default = app;
