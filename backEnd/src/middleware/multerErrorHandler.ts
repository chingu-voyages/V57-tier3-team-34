// middleware/multerErrorHandler.ts
import multer from "multer";
import { Request, Response, NextFunction } from "express";

export function multerErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("It hit here");
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json({ status: false, message: "File too large (max 2MB)." });
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json({ status: false, message: "Please upload image files only." });
      default:
        return res.status(400).json({ status: false, message: err.message });
    }
  }

  if (err) {
    return res
      .status(500)
      .json({ status: false, message: "Upload failed.", error: err.message });
  }

  next();
}
