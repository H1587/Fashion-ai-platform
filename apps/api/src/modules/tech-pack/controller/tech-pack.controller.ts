import type { Response } from "express";

import type { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";

import { TechPackService } from "../service/tech-pack.service.js";
import { UpdateTechPackSchema } from "../validators/tech-pack.validator.js";

const techPackService = new TechPackService();

export async function generateTechPack(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const imageId = req.params.id;

        if (!imageId || Array.isArray(imageId)) {
            return res.status(400).json({
                message: "Invalid image id.",
            });
        }

        const techPack =
            await techPackService.generateTechPack(
                imageId,
                req.user.userId
            );

        return res.status(201).json({
            message: "Tech Pack generated successfully.",
            techPack,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to generate Tech Pack.",
        });
    }
}

export async function getTechPack(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const imageId = req.params.id;

        if (!imageId || Array.isArray(imageId)) {
            return res.status(400).json({
                message: "Invalid image id.",
            });
        }

        const techPack =
            await techPackService.getTechPack(
                imageId,
                req.user.userId
            );

        if (!techPack) {
            return res.status(404).json({
                message: "Tech Pack not found.",
            });
        }

        return res.status(200).json({
            techPack,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve Tech Pack.",
        });
    }
}

export async function updateTechPack(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const techPackId = req.params.id;

        if (!techPackId || Array.isArray(techPackId)) {
            return res.status(400).json({
                message: "Invalid Tech Pack id.",
            });
        }

        const validation =
            UpdateTechPackSchema.safeParse(
                req.body
            );

        if (!validation.success) {
            return res.status(400).json({
                message: "Validation failed.",
                errors:
                    validation.error.flatten(),
            });
        }

        const techPack =
            await techPackService.updateTechPack(
                techPackId,
                req.user.userId,
                validation.data
            );

        return res.status(200).json({
            message: "Tech Pack updated successfully.",
            techPack,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update Tech Pack.",
        });
    }
}