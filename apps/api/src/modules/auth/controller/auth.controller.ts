import { Request, Response } from "express";

import { AuthService } from "../service/auth.service.js";
import { loginUserSchema } from "../validators/login-user.validator.js";
import { registerUserSchema } from "../validators/register-user.validator.js";

const authService = new AuthService();

export async function register(req: Request, res: Response) {
    try {
        const data = registerUserSchema.parse(req.body);

        const user = await authService.register(data);

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Registration failed.",
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const data = loginUserSchema.parse(req.body);

        const result = await authService.login(data);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({
            message: error instanceof Error ? error.message : "Invalid email or password.",
        });
    }
}