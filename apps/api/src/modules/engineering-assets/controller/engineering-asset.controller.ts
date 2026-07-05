import type { Response } from "express";

import type {
    AuthenticatedRequest,
} from "../../../middleware/auth.middleware.js";

import {
    EngineeringAssetService,
} from "../service/engineering-asset.service.js";

const engineeringAssetService =
    new EngineeringAssetService();

export async function generateEngineeringAssets(
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

        const assets =
            await engineeringAssetService.generate(
                imageId,
                req.user.userId
            );

        return res.status(201).json({
            message:
                "Engineering Assets generated successfully.",
            assets,
        });

    } catch (error) {

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to generate Engineering Assets.",
        });

    }
}

export async function getEngineeringAssets(
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

        const assets =
            await engineeringAssetService.getAssets(
                imageId,
                req.user.userId
            );

        return res.status(200).json({
            assets,
        });

    } catch (error) {

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve Engineering Assets.",
        });

    }
}