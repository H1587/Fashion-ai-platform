import {
    AnalysisStatus,
    PrismaClient,
    type ImageAnalysis,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";
import type { GarmentAnalysisDTO } from "../validators/index.js";

export class AIRepository {
    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    async createAnalysis(
        imageId: string,
        analysis: GarmentAnalysisDTO,
        rawResponse: unknown
    ): Promise<ImageAnalysis> {
        return this.prismaClient.imageAnalysis.create({
            data: {
                imageId,

                provider: "google",

                model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",

                promptVersion: "v1",

                status: AnalysisStatus.COMPLETED,

                garmentCategory: analysis.garmentCategory,
                garmentType: analysis.garmentType,
                primaryColor: analysis.primaryColor,
                secondaryColor: analysis.secondaryColor,
                pattern: analysis.pattern,
                sleeveType: analysis.sleeveType,
                collarType: analysis.collarType,
                fit: analysis.fit,
                closureType: analysis.closureType,
                pocketType: analysis.pocketType,
                fabricGuess: analysis.fabricGuess,
                gender: analysis.gender,
                season: analysis.season,
                style: analysis.style,

                confidence: analysis.confidence,

                rawResponse: rawResponse as object,
            },
        });
    }

    async findLatestAnalysis(
        imageId: string
    ): Promise<ImageAnalysis | null> {
        return this.prismaClient.imageAnalysis.findFirst({
            where: {
                imageId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}