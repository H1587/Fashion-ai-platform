import type {
    AIProvider,
} from "../../../services/ai/ai-provider.js";

import {
    PollinationsProvider,
} from "../../../services/ai/pollinations-provider.js";

import {
    EngineeringAssetRepository,
} from "../repository/engineering-asset.repository.js";

import { prisma } from "../../../lib/prisma.js";

import {
    UploadRepository,
} from "../../uploads/repository/upload.repository.js";

import {
    ProductSpecificationRepository,
} from "../../product-specification/repository/product-specification.repository.js";

import {
    TechPackRepository,
} from "../../tech-pack/repository/tech-pack.repository.js";

import {
    RenderedAssetRepository,
} from "../repository/rendered-asset.repository.js";

import {
    RenderedAssetStorageService,
} from "./rendered-asset-storage.service.js";

import {
    MasterGarmentRepresentationBuilderService,
} from "./master-garment-representation-builder.service.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

import {
    buildEngineeringAssetRenderingPrompt,
} from "../prompts/engineering-asset-rendering.prompt.js";

import {
    EngineeringAssetRenderingParser,
} from "../parser/engineering-asset-rendering.parser.js";

import {
    EngineeringAssetRenderingMapper,
} from "../mapper/engineering-asset-rendering.mapper.js";

import {
    EngineeringAssetRenderingResponseSchema,
} from "../validators/engineering-asset-rendering.validator.js";

import {
    EngineeringAssetPromptBuilder,
} from "../prompts/engineering-asset-prompt-builder.js";

export class EngineeringAssetRenderingService {

    private readonly engineeringAssetRepository: EngineeringAssetRepository;

    private readonly uploadRepository: UploadRepository;

    private readonly specificationRepository: ProductSpecificationRepository;

    private readonly techPackRepository: TechPackRepository;

    private readonly renderedAssetRepository: RenderedAssetRepository;

    private readonly renderedAssetStorageService:
        RenderedAssetStorageService;

    private readonly masterGarmentBuilder:
        MasterGarmentRepresentationBuilderService;

    private readonly aiProvider: AIProvider;

    constructor(
        aiProvider: AIProvider = new PollinationsProvider()
    ) {

        this.uploadRepository =
            new UploadRepository(prisma);

        this.specificationRepository =
            new ProductSpecificationRepository(prisma);

        this.techPackRepository =
            new TechPackRepository(prisma);

        this.engineeringAssetRepository =
            new EngineeringAssetRepository();

        this.renderedAssetRepository =
            new RenderedAssetRepository();

        this.renderedAssetStorageService =
            new RenderedAssetStorageService();

        this.masterGarmentBuilder =
            new MasterGarmentRepresentationBuilderService();

        this.aiProvider =
            aiProvider;

    }

    async renderEngineeringAssets(
        imageId: string,
        userId: string
    ) {

        const master =
            await this.masterGarmentBuilder.build(
                imageId,
                userId
            );

        const assets =
            master.engineeringAssets;

        const renderedAssets: RenderedAssetDTO[] = [];

        for (const asset of assets) {

            const request: RenderingRequest = {
                asset,
                outputFormat: "PNG",
                renderStyle: "TECHNICAL_LINE_ART",
                promptVersion: "v1",
            };

            const promptBuilder =
                new EngineeringAssetPromptBuilder();

            const prompt =
                promptBuilder.build(
                    master,
                    request
                );

            const aiResponse =
                await this.aiProvider.generateImage({

                    assetType: asset.assetType,

                    prompt,

                });

            const parsed =
                aiResponse.renderedOutput;

            const mapped =
                EngineeringAssetRenderingMapper.toDTOs(
                    asset.id,
                    parsed
                );

            for (let i = 0; i < mapped.length; i++) {

                const renderedAsset =
                    parsed.renderedAssets[i];
                if (!renderedAsset) {
                    continue;
                }

                const savedFile =
                    await this.renderedAssetStorageService.saveImage(
                        renderedAsset.renderedOutput as string,
                        renderedAsset.format.toLowerCase()
                    );

                const dto =
                    mapped[i];

                if (!dto) {
                    continue;
                }

                dto.filename =
                    savedFile.filename;

                dto.storageLocation =
                    savedFile.storageLocation;

            }

            renderedAssets.push(
                ...mapped
            );

        }

        return this.renderedAssetRepository.createMany(
            renderedAssets
        );

    }

    async getRenderedEngineeringAssets(
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

        const assets =
            await this.engineeringAssetRepository.findByTechPackId(
                techPack.id
            );

        const renderedAssets = [];

        for (const asset of assets) {

            const assetRenderings =
                await this.renderedAssetRepository.findByEngineeringAssetId(
                    asset.id
                );

            renderedAssets.push(
                ...assetRenderings
            );

        }

        return renderedAssets;

    }

}
