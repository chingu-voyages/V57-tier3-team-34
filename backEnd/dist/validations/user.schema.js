"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voterSchema = exports.candidateSchema = exports.userUpdateSchema = exports.loginSchema = exports.userSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required").min(2, "Name is required"),
    email: zod_1.z.email("Please provide a valid email"),
    password: zod_1.z
        .string("Please enter a valid password")
        .min(1, "Please provide a password"),
    userType: zod_1.z.nativeEnum(client_1.Roles),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Please enter a valid email address"),
    password: zod_1.z.string("Password is required"),
});
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required"),
    manifesto: zod_1.z.string().nullable().optional(),
    userImage: zod_1.z.string().nullable().optional(),
});
exports.candidateSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required").min(2, "Name is required"),
    email: zod_1.z.email("Please provide a valid email"),
    userType: zod_1.z.nativeEnum(client_1.Roles),
    password: zod_1.z.string().optional(),
    partyId: zod_1.z.number().optional(),
    bio: zod_1.z.string("Bio is required."),
    userImage: zod_1.z.string().optional(),
    position: zod_1.z.string("Please enter the position candidate is "),
});
exports.voterSchema = zod_1.z.object({
    name: zod_1.z.string("Full name is required").min(2, "Full name is required"),
    email: zod_1.z.email("Please provide a valid email"),
    password: zod_1.z.string("Password is required").min(6, "Password must be at least 6 characters"),
    userType: zod_1.z.nativeEnum(client_1.Roles).optional().default("VOTER"),
});
