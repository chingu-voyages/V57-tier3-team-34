import { ZodError } from "zod";
import logger from "./logger";
import { Prisma } from "@prisma/client";

export interface ErrorResponse {
  status: number;
  body: {
    success: false;
    message?: string;
    errors?: string[];
  };
}

const errorHandler = (error: unknown): ErrorResponse => {
  console.log(error);
  // Zod validation error
  if (error instanceof ZodError) {
    return {
      status: 400,
      body: {
        success: false,
        errors: error.issues.map((issue) => issue.message),
      },
    };
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
    logger.error(`Error: ${error.message}`);
    return {
      status: 400,
      body: {
        success: false,
        message: error.message,
      },
    };
  }

  // ✅ Unknown error
  logger.error("Unknown error", error);
  return {
    status: 500,
    body: {
      success: false,
      message: "An unknown error occurred",
    },
  };
};

export default errorHandler;
