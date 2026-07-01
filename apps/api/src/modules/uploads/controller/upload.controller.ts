import { Response } from "express";

import { AuthenticatedRequest } from "../../../middleware/auth.middleware.js";
import { uploadImageSchema } from "../validators/upload-image.validator.js";
import { UploadService } from "../service/upload.service.js";

const uploadService = new UploadService();

export class UploadController {
    async upload(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> {
        try {
            const userId = req.user?.userId;


            if (!userId) {
                res.status(401).json({
                    message: "Authentication required.",
                });
                return;
            }

            const { projectId } = uploadImageSchema.parse(req.body);

            if (!req.file) {
                res.status(400).json({
                    message: "Image file is required.",
                });
                return;
            }

            const image = await uploadService.uploadImage(
                userId,
                projectId,
                {
                    buffer: req.file.buffer,
                    originalFilename: req.file.originalname,
                    mimeType: req.file.mimetype,
                }
            );

            res.status(201).json(image);
        } catch (error) {
            if (error instanceof Error && error.name === "ZodError") {
                res.status(400).json({
                    message: "Validation failed.",
                    errors: error,
                });
                return;
            }

            res.status(404).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Project not found.",
            });
        }
    }

    async getById(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                message: "Authentication required.",
            });
            return;
        }

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            res.status(400).json({
                message: "Invalid image id.",
            });
            return;
        }

        const image = await uploadService.getImage(id, userId);

        if (!image) {
            res.status(404).json({
                message: "Image not found.",
            });
            return;
        }

        res.json(image);
    }

    async delete(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                message: "Authentication required.",
            });
            return;
        }

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            res.status(400).json({
                message: "Invalid image id.",
            });
            return;
        }

        try {
            const image = await uploadService.deleteImage(id, userId);

            res.json(image);
        } catch (error) {
            res.status(404).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Image not found.",
            });
        }
    }
}