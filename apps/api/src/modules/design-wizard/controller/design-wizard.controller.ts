import type { Response } from "express";

import type { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";

import { DesignWizardService } from "../service/design-wizard.service.js";
import type { UpdateDesignWizardDto } from "../dto/design-wizard.dto.js";
import { updateDesignWizardSchema } from "../validators/design-wizard.validator.js";

const designWizardService = new DesignWizardService();

export async function getDesignWizard(
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
            await designWizardService.getDesignWizard(
                imageId,
                req.user.userId
            );

        return res.status(200).json({
            specification,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve design wizard.",
        });
    }
}

export async function updateDesignWizard(
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

        const dto: UpdateDesignWizardDto =
            updateDesignWizardSchema.parse(req.body);

        const specification =
            await designWizardService.updateDesignWizard(
                imageId,
                req.user.userId,
                dto
            );

        return res.status(200).json({
            message: "Design wizard updated successfully.",
            specification,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update design wizard.",
        });
    }
}