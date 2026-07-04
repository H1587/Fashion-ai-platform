import type { TechPack } from "@prisma/client";

export interface ExportDocumentDTO {
    title: string;
    technicalDescription?: string;
    constructionDetails?: string;
    fabricDetails?: string;
    trimDetails?: string;
    measurementNotes?: string;
    fitNotes?: string;
    careInstructions?: string;
    packagingInstructions?: string;
    qualityNotes?: string;
    revision: number;
}

export class ExportMapper {
    static fromTechPack(
        techPack: TechPack
    ): ExportDocumentDTO {
        return {
            title: techPack.title ?? "Tech Pack",

            technicalDescription:
                techPack.technicalDescription ?? undefined,

            constructionDetails:
                techPack.constructionDetails ?? undefined,

            fabricDetails:
                techPack.fabricDetails ?? undefined,

            trimDetails:
                techPack.trimDetails ?? undefined,

            measurementNotes:
                techPack.measurementNotes ?? undefined,

            fitNotes:
                techPack.fitNotes ?? undefined,

            careInstructions:
                techPack.careInstructions ?? undefined,

            packagingInstructions:
                techPack.packagingInstructions ?? undefined,

            qualityNotes:
                techPack.qualityNotes ?? undefined,

            revision: techPack.revision,
        };
    }
}