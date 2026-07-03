import type { ProductSpecification } from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import { UploadRepository } from "../../uploads/repository/upload.repository.js";

import { DesignWizardRepository } from "../repository/design-wizard.repository.js";
import type { UpdateDesignWizardDto } from "../dto/design-wizard.dto.js";

export class DesignWizardService {
    private readonly uploadRepository: UploadRepository;
    private readonly repository: DesignWizardRepository;

    constructor() {
        this.uploadRepository = new UploadRepository(prisma);
        this.repository = new DesignWizardRepository(prisma);
    }

    async getDesignWizard(
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

        const specification =
            await this.repository.findByImageId(imageId);

        if (!specification) {
            throw new Error("Product specification not found.");
        }

        return specification;
    }

    async updateDesignWizard(
        imageId: string,
        userId: string,
        dto: UpdateDesignWizardDto
    ): Promise<ProductSpecification> {
        const image = await this.uploadRepository.findById(
            imageId,
            userId
        );

        if (!image) {
            throw new Error("Image not found.");
        }

        const specification =
            await this.repository.findByImageId(imageId);

        if (!specification) {
            throw new Error("Product specification not found.");
        }

        return this.repository.update(
            specification.id,
            dto
        );
    }
}