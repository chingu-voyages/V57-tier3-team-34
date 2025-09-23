"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const logger_1 = __importDefault(require("./logger"));
const client_1 = require("@prisma/client");
const errorHandler = (error) => {
    // Zod validation error
    if (error instanceof zod_1.ZodError) {
        return {
            status: 400,
            body: {
                success: false,
                errors: error.issues.map((issue) => issue.message),
            },
        };
    }
    // Prisma errors
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return {
            status: 400,
            body: {
                success: false,
                message: error.message,
            },
        };
    }
    // Generic error
    if (error instanceof Error) {
        logger_1.default.error(`Error: ${error.message}`);
        return {
            status: 500,
            body: {
                success: false,
                message: error.message,
            },
        };
    }
    // ✅ Unknown error
    logger_1.default.error("Unknown error", error);
    return {
        status: 500,
        body: {
            success: false,
            message: "An unknown error occurred",
        },
    };
};
exports.default = errorHandler;
