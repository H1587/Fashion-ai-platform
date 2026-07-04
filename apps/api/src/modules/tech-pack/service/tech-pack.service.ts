import type {
    ProductSpecification,
    TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import { UploadRepository } from "../../uploads/repository/upload.repository.js";
import { ProductSpecificationRepository } from "../../product-specification/repository/product-specification.repository.js";

import { TechPackRepository } from "../repository/tech-pack.repository.js";
import { TechPackMapper } from "../mapper/tech-pack.mapper.js";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackService {
    private readonly uploadRepository: UploadRepository;

    private readonly specificationRepository: ProductSpecificationRepository;

    private readonly repository: TechPackRepository;

    constructor() {
        this.uploadRepository =
            new UploadRepository(prisma);

        this.specificationRepository =
            new ProductSpecificationRepository(prisma);

        this.repository =
            new TechPackRepository(prisma);
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

        const techPack =
            TechPackMapper.fromProductSpecification(
                specification as ProductSpecification
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