import { Response } from "express";

import { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";
import { UserRepository } from "../repository/user.repository.js";

const userRepository = new UserRepository();

export async function me(
    req: AuthenticatedRequest,
    res: Response
) {
    const user = await userRepository.findById(req.user!.userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found.",
        });
    }

    return res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}