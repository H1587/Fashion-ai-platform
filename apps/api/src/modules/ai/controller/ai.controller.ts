import type { Response } from "express";

import type { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";

import { AIService } from "../service/ai.service.js";

const aiService = new AIService();

export async function analyzeImage(
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

        const analysis = await aiService.analyzeImage(
            imageId,
            req.user.userId
        );

        return res.status(200).json({
            message: "Image analyzed successfully.",
            analysis,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Image analysis failed.",
        });
    }
}

export async function getAnalysis(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        const imageId = req.params.id;

        if (!imageId || Array.isArray(imageId)) {
            return res.status(400).json({
                message: "Invalid image id.",
            });
        }

        const analysis = await aiService.getAnalysis(imageId);

        if (!analysis) {
            return res.status(404).json({
                message: "Analysis not found.",
            });
        }

        return res.status(200).json({
            analysis,
        });
    } catch {
        return res.status(500).json({
            message: "Failed to retrieve analysis.",
        });
    }
}