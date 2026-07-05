import type {
    TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import { UploadRepository } from "../../uploads/repository/upload.repository.js";
import { ProductSpecificationRepository } from "../../product-specification/repository/product-specification.repository.js";
import { TechPackRepository } from "../../tech-pack/repository/tech-pack.repository.js";

import {
    GeminiProvider,
    type AIProvider,
} from "../../../services/ai/index.js";

import {
    EngineeringAssetRepository,
} from "../repository/engineering-asset.repository.js";

import {
    EngineeringAssetAIParser,
} from "../parser/engineering-asset-ai.parser.js";

import {
    EngineeringAssetAIMapper,
} from "../mapper/engineering-asset-ai.mapper.js";

import {
    buildEngineeringAssetPrompt,
} from "../prompts/engineering-asset-generation.prompt.js";

export class EngineeringAssetService {

    private readonly uploadRepository: UploadRepository;

    private readonly specificationRepository: ProductSpecificationRepository;

    private readonly techPackRepository: TechPackRepository;

    private readonly repository: EngineeringAssetRepository;

    private readonly aiProvider: AIProvider;

    constructor(
        aiProvider: AIProvider = new GeminiProvider()
    ) {

        this.uploadRepository =
            new UploadRepository(prisma);

        this.specificationRepository =
            new ProductSpecificationRepository(prisma);

        this.techPackRepository =
            new TechPackRepository(prisma);

        this.repository =
            new EngineeringAssetRepository();

        this.aiProvider =
            aiProvider;
    }

    async generate(
        imageId: string,
        userId: string
    ) {

        const image =
            await this.uploadRepository.findById(
                imageId,
                userId
            );

        if (!image) {
            throw new Error(
                "Image not found."
            );
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

        const techPack =
            await this.techPackRepository.findLatest(
                specification.id
            );

        if (!techPack) {
            throw new Error(
                "Tech Pack not found."
            );
        }

        const existing =
            await this.repository.findByTechPackId(
                techPack.id
            );

        if (existing.length > 0) {
            return existing;
        }

        const prompt =
            buildEngineeringAssetPrompt(
                techPack as TechPack
            );

        const aiResponse =
            await this.aiProvider.generateText(
                prompt
            );
        console.log("========== GEMINI RESPONSE ==========");
        console.log(aiResponse.text);
        console.log("=====================================");

        const parsed =
            EngineeringAssetAIParser.parse(
                aiResponse.text
            );

        const assets =
            EngineeringAssetAIMapper.toDTOs(
                techPack.id,
                parsed
            );

        return this.repository.createMany(
            assets
        );
    }

    async getAssets(
        imageId: string,
        userId: string
    ) {

        const image =
            await this.uploadRepository.findById(
                imageId,
                userId
            );

        if (!image) {
            throw new Error(
                "Image not found."
            );
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

        const techPack =
            await this.techPackRepository.findLatest(
                specification.id
            );

        if (!techPack) {
            throw new Error(
                "Tech Pack not found."
            );
        }

        return this.repository.findByTechPackId(
            techPack.id
        );
    }

}