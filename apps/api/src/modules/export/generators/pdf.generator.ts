import PDFDocument from "pdfkit";

import { ExportMapper } from "../mapper/export.mapper.js";

export class ExportPdfGenerator {
    async generate(techPack: Parameters<typeof ExportMapper.fromTechPack>[0]): Promise<Buffer> {
        const document = ExportMapper.fromTechPack(techPack);

        return new Promise((resolve, reject) => {
            const pdf = new PDFDocument({
                margin: 50,
                size: "A4",
            });

            const chunks: Buffer[] = [];

            pdf.on("data", (chunk) => {
                chunks.push(Buffer.from(chunk));
            });

            pdf.on("end", () => {
                resolve(Buffer.concat(chunks));
            });

            pdf.on("error", reject);

            pdf
                .fontSize(22)
                .text(document.title, {
                    underline: true,
                });

            pdf.moveDown();

            const writeSection = (
                heading: string,
                value?: string
            ) => {
                if (!value) {
                    return;
                }

                pdf
                    .fontSize(14)
                    .text(heading, {
                        continued: false,
                    });

                pdf
                    .fontSize(11)
                    .text(value);

                pdf.moveDown();
            };

            writeSection(
                "Technical Description",
                document.technicalDescription
            );

            writeSection(
                "Construction Details",
                document.constructionDetails
            );

            writeSection(
                "Fabric Details",
                document.fabricDetails
            );

            writeSection(
                "Trim Details",
                document.trimDetails
            );

            writeSection(
                "Measurement Notes",
                document.measurementNotes
            );

            writeSection(
                "Fit Notes",
                document.fitNotes
            );

            writeSection(
                "Care Instructions",
                document.careInstructions
            );

            writeSection(
                "Packaging Instructions",
                document.packagingInstructions
            );

            writeSection(
                "Quality Notes",
                document.qualityNotes
            );

            pdf
                .moveDown()
                .fontSize(10)
                .text(
                    `Revision: ${document.revision}`
                );

            pdf.end();
        });
    }
}