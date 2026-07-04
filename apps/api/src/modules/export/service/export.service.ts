import type { TechPack } from "@prisma/client";

import { ExportRepository } from "../repository/export.repository.js";
import { ExportPdfGenerator } from "../generators/pdf.generator.js";
import { ExportDocxGenerator } from "../generators/docx.generator.js";

import type {
    ExportFormat,
    ExportResultDTO,
} from "../dto/export.dto.js";

export class ExportService {
    private readonly repository: ExportRepository;

    private readonly pdfGenerator: ExportPdfGenerator;

    private readonly docxGenerator: ExportDocxGenerator;

    constructor() {
        this.repository = new ExportRepository();

        this.pdfGenerator =
            new ExportPdfGenerator();

        this.docxGenerator =
            new ExportDocxGenerator();
    }

    async generate(
        techPackId: string,
        userId: string,
        format: ExportFormat
    ): Promise<ExportResultDTO> {
        const techPack =
            await this.repository.findTechPackById(
                techPackId,
                userId
            );

        if (!techPack) {
            throw new Error(
                "Tech Pack not found."
            );
        }

        let buffer: Buffer;

        switch (format) {
            case "pdf":
                buffer =
                    await this.pdfGenerator.generate(
                        techPack
                    );
                break;

            case "docx":
                buffer =
                    await this.docxGenerator.generate(
                        techPack
                    );
                break;

            default:
                throw new Error(
                    "Unsupported export format."
                );
        }

        return {
            filename: `${techPack.id}.${format}`,
            mimeType:
                format === "pdf"
                    ? "application/pdf"
                    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            buffer,
        };
    }
}