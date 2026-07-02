import { promises as fs } from "node:fs";

import { prisma } from "../../../lib/prisma.js";

import {
    GeminiProvider,
    type AIProvider,
} from "../../../services/ai/index.js";
import { LocalStorageService } from "../../../services/storage/local-storage.service.js";

import { UploadRepository } from "../../uploads/repository/upload.repository.js";

import { AIRepository } from "../repository/ai.repository.js";
import { GarmentAnalysisParser } from "../parser/index.js";
import { GARMENT_ANALYSIS_PROMPT } from "../prompts/index.js";

export class AIService {
    private readonly repository: AIRepository;
    private readonly uploadRepository: UploadRepository;
    private readonly storageService: LocalStorageService;
    private readonly aiProvider: AIProvider;

    constructor(
        aiProvider: AIProvider = new GeminiProvider()
    ) {
        this.repository = new AIRepository(prisma);
        this.uploadRepository = new UploadRepository(prisma);
        this.storageService = new LocalStorageService();
        this.aiProvider = aiProvider;
    }

    async analyzeImage(
        imageId: string,
        userId: string
    ) {
        const image = await this.uploadRepository.findById(
            imageId,
            userId
        );

        if (!image) {
            throw new Error("Image not found.");
        }

        const filePath = this.storageService.getFilePath(
            image.storedFilename
        );

        const imageBuffer = await fs.readFile(filePath);

        const response = await this.aiProvider.analyzeImage({
            imageBase64: imageBuffer.toString("base64"),
            mimeType: image.mimeType,
            prompt: GARMENT_ANALYSIS_PROMPT,
        });

        const analysis = GarmentAnalysisParser.parse(
            response.text
        );

        return this.repository.createAnalysis(
            image.id,
            analysis,
            response.rawResponse
        );
    }

    async getAnalysis(
        imageId: string
    ) {
        return this.repository.findLatestAnalysis(imageId);
    }
}