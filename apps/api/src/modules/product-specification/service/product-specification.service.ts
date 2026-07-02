import type { ProductSpecification } from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import { AIRepository } from "../../ai/repository/ai.repository.js";
import { UploadRepository } from "../../uploads/repository/upload.repository.js";

import { ProductSpecificationRepository } from "../repository/product-specification.repository.js";
import { SpecificationMapper } from "../mapper/specification.mapper.js";

export class ProductSpecificationService {
    private readonly aiRepository: AIRepository;
    private readonly uploadRepository: UploadRepository;
    private readonly repository: ProductSpecificationRepository;

    constructor() {
        this.aiRepository = new AIRepository(prisma);
        this.uploadRepository = new UploadRepository(prisma);
        this.repository = new ProductSpecificationRepository(prisma);
    }

    async generateSpecification(
        imageId: string,
        userId: string
    ): Promise<ProductSpecification> {

        const image = await this.uploadRepository.findById(
            imageId,
            userId
        );

        if (!image) {
            throw new Error("Image not found.");
        }

        const existing = await this.repository.findLatest(imageId);

        if (existing) {
            return existing;
        }

        const analysis = await this.aiRepository.findLatestAnalysis(
            imageId
        );

        if (!analysis) {
            throw new Error("Image analysis not found.");
        }

        const specification =
            SpecificationMapper.toProductSpecification(
                analysis
            );

        return this.repository.create(specification);
    }

    async getSpecification(
        imageId: string,
        userId: string
    ): Promise<ProductSpecification | null> {

        const image = await this.uploadRepository.findById(
            imageId,
            userId
        );

        if (!image) {
            throw new Error("Image not found.");
        }

        return this.repository.findLatest(imageId);
    }
}