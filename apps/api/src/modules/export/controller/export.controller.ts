import type { Response } from "express";

import type {
    AuthenticatedRequest,
} from "../../../middleware/auth.middleware.js";

import { ExportService } from "../service/export.service.js";

const exportService = new ExportService();

export async function exportPdf(
    req: AuthenticatedRequest,
    res: Response
) {
    return exportDocument(
        req,
        res,
        "pdf"
    );
}

export async function exportDocx(
    req: AuthenticatedRequest,
    res: Response
) {
    return exportDocument(
        req,
        res,
        "docx"
    );
}

async function exportDocument(
    req: AuthenticatedRequest,
    res: Response,
    format: "pdf" | "docx"
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

        const result =
            await exportService.generate(
                techPackId,
                req.user.userId,
                format
            );

        res.setHeader(
            "Content-Type",
            result.mimeType
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${result.filename}"`
        );

        return res.send(result.buffer);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Export failed.",
        });
    }
}