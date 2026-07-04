import {
    Document,
    Packer,
    Paragraph,
    HeadingLevel,
    TextRun,
} from "docx";

import { ExportMapper } from "../mapper/export.mapper.js";

export class ExportDocxGenerator {
    async generate(
        techPack: Parameters<typeof ExportMapper.fromTechPack>[0]
    ): Promise<Buffer> {
        const document =
            ExportMapper.fromTechPack(
                techPack
            );

        const children: Paragraph[] = [];

        children.push(
            new Paragraph({
                heading: HeadingLevel.TITLE,
                children: [
                    new TextRun(
                        document.title
                    ),
                ],
            })
        );

        const addSection = (
            heading: string,
            value?: string
        ) => {
            if (!value) {
                return;
            }

            children.push(
                new Paragraph({
                    heading:
                        HeadingLevel.HEADING_1,
                    children: [
                        new TextRun(
                            heading
                        ),
                    ],
                })
            );

            children.push(
                new Paragraph({
                    children: [
                        new TextRun(
                            value
                        ),
                    ],
                })
            );
        };

        addSection(
            "Technical Description",
            document.technicalDescription
        );

        addSection(
            "Construction Details",
            document.constructionDetails
        );

        addSection(
            "Fabric Details",
            document.fabricDetails
        );

        addSection(
            "Trim Details",
            document.trimDetails
        );

        addSection(
            "Measurement Notes",
            document.measurementNotes
        );

        addSection(
            "Fit Notes",
            document.fitNotes
        );

        addSection(
            "Care Instructions",
            document.careInstructions
        );

        addSection(
            "Packaging Instructions",
            document.packagingInstructions
        );

        addSection(
            "Quality Notes",
            document.qualityNotes
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun(
                        `Revision: ${document.revision}`
                    ),
                ],
            })
        );

        const doc =
            new Document({
                sections: [
                    {
                        children,
                    },
                ],
            });

        return Buffer.from(
            await Packer.toBuffer(doc)
        );
    }
}