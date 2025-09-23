"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.loginSchema = exports.userSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required").min(2, "Name is required"),
    email: zod_1.z.email("Please provide a valid email"),
    password: zod_1.z
        .string("Please enter a valid password")
        .min(1, "Please provide a password"),
    userType: zod_1.z.enum(client_1.Roles),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Please enter a valid email address"),
    password: zod_1.z.string("Password is required"),
});
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required"),
});
