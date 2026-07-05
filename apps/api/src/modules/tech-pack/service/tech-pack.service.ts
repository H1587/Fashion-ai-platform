import type {
    ProductSpecification,
    TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import { UploadRepository } from "../../uploads/repository/upload.repository.js";
import { ProductSpecificationRepository } from "../../product-specification/repository/product-specification.repository.js";

import { TechPackRepository } from "../repository/tech-pack.repository.js";
import { TechPackAIMapper } from "../mapper/tech-pack-ai.mapper.js";
import { TechPackAIParser } from "../parser/tech-pack-ai.parser.js";
import { buildTechPackPrompt } from "../prompts/tech-pack-generation.prompt.js";

import {
    GeminiProvider,
    type AIProvider,
} from "../../../services/ai/index.js";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackService {
    private readonly uploadRepository: UploadRepository;

    private readonly specificationRepository: ProductSpecificationRepository;

    private readonly repository: TechPackRepository;
    private readonly aiProvider: AIProvider;

    constructor(
        aiProvider: AIProvider = new GeminiProvider()
    ) {
        this.uploadRepository =
            new UploadRepository(prisma);

        this.specificationRepository =
            new ProductSpecificationRepository(prisma);

        this.repository =
            new TechPackRepository(prisma);

        this.aiProvider = aiProvider;
    }

    async generateTechPack(
        imageId: string,
        userId: string
    ): Promise<TechPack> {

        const image =
            await this.uploadRepository.findById(
                imageId,
                userId
            );

        if (!image) {
            throw new Error("Image not found.");
        }

        const specification =
            await this.specificationRepository.findLatest(
                imageId
            );

        if (!specification) {
            throw new Error(
                "Product specification not found."
            );
        }

        const existing =
            await this.repository.findLatest(
                specification.id
            );

        if (existing) {
            return existing;
        }

        const prompt =
            buildTechPackPrompt(
                specification as ProductSpecification
            );

        const aiResponse =
            await this.aiProvider.generateText(
                prompt
            );

        const parsedResponse =
            TechPackAIParser.parse(
                aiResponse.text
            );

        const techPack =
            TechPackAIMapper.toTechPackDTO(
                specification.id,
                parsedResponse
            );

        return this.repository.create(
            techPack
        );
    }

    async getTechPack(
        imageId: string,
        userId: string
    ): Promise<TechPack | null> {

        const image =
            await this.uploadRepository.findById(
                imageId,
                userId
            );

        if (!image) {
            throw new Error("Image not found.");
        }

        const specification =
            await this.specificationRepository.findLatest(
                imageId
            );

        if (!specification) {
            return null;
        }

        return this.repository.findLatest(
            specification.id
        );
    }

    async updateTechPack(
        techPackId: string,
        userId: string,
        updates: Partial<TechPackDTO>
    ): Promise<TechPack> {

        const existing =
            await this.repository.findByIdAndUserId(
                techPackId,
                userId
            );

        if (!existing) {
            throw new Error(
                "Tech Pack not found."
            );
        }

        return this.repository.update(
            techPackId,
            updates
        );
    }
}