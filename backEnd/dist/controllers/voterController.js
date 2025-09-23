"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoter = void 0;
const db_config_1 = __importDefault(require("@/config/db.config"));
const createVoter = async (req, res) => {
    const { fullName, email, password } = req.body;
    const emailExists = await db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (emailExists)
        return res
            .status(400)
            .json({ message: "Email already exists. Please use another" });
    const newUser = await db_config_1.default.user.create({
        data: {
            name: fullName,
            email,
            password,
        },
    });
    return res.status(201).json({ msg: "User created successfully", newUser });
};
exports.createVoter = createVoter;
