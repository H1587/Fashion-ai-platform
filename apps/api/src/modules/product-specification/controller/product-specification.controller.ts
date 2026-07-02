import type { Response } from "express";

import type { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";

import { ProductSpecificationService } from "../service/product-specification.service.js";

const specificationService = new ProductSpecificationService();

export async function generateProductSpecification(
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

        const specification =
            await specificationService.generateSpecification(
                imageId,
                req.user.userId
            );

        return res.status(201).json({
            message: "Product specification generated successfully.",
            specification,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to generate product specification.",
        });
    }
}

export async function getProductSpecification(
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

        const specification =
            await specificationService.getSpecification(
                imageId,
                req.user.userId
            );

        if (!specification) {
            return res.status(404).json({
                message: "Product specification not found.",
            });
        }

        return res.status(200).json({
            specification,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve product specification.",
        });
    }
}