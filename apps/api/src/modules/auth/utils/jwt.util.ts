import jwt from "jsonwebtoken";

import { AUTH_CONSTANTS } from "../constants/auth.constants.js";

const jwtSecret = process.env.JWT_SECRET;

export function generateToken(userId: string): string {
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.sign(
        { userId },
        jwtSecret,
        {
            expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRES_IN,
        }
    );
}