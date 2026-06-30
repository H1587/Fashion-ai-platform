import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export function authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({
            message: "JWT_SECRET is not configured.",
        });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required.",
        });
    }

    const token = authHeader.substring(7);

    try {
        req.user = jwt.verify(token, jwtSecret) as JwtPayload;
        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
}