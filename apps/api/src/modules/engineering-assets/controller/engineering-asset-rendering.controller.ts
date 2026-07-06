import type { Response } from "express";

import type {
    AuthenticatedRequest,
} from "../../../middleware/auth.middleware.js";

import {
    EngineeringAssetRenderingService,
} from "../service/engineering-asset-rendering.service.js";

const engineeringAssetRenderingService =
    new EngineeringAssetRenderingService();

export async function renderEngineeringAssets(
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
                message: "Invalid Tech Pack id.",
            });
        }

        const renderedAssets =
            await engineeringAssetRenderingService.renderEngineeringAssets(
                imageId,
                req.user.userId
            );

        return res.status(201).json({
            message:
                "Engineering Assets rendered successfully.",
            renderedAssets,
        });

    } catch (error) {

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to render Engineering Assets.",
        });

    }
}

export async function getRenderedEngineeringAssets(
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
                message: "Invalid Image id.",
            });
        }

        const renderedAssets =
            await engineeringAssetRenderingService.getRenderedEngineeringAssets(
                imageId,
                req.user.userId
            );

        return res.status(200).json({
            renderedAssets,
        });

    } catch (error) {

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch rendered Engineering Assets.",
        });

    }
}