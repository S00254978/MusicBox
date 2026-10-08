import mongoose from "mongoose";
import type { ErrorRequestHandler } from "express";



export const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
) => {
    if (
        error instanceof mongoose.Error.ValidationError ||
        error instanceof mongoose.Error.CastError
    ) {
        res.status(400).json({ message: "Invalid data" });
        return;
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
    ) {
        res.status(409).json({ message: "A record with that value already exists" });
        return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
};