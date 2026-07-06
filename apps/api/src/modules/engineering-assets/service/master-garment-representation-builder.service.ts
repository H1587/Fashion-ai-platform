import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

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
    EngineeringAssetRepository,
} from "../repository/engineering-asset.repository.js";

import { prisma } from "../../../lib/prisma.js";

export class MasterGarmentRepresentationBuilderService {

    private readonly uploadRepository =
        new UploadRepository(prisma);

    private readonly specificationRepository =
        new ProductSpecificationRepository(prisma);

    private readonly techPackRepository =
        new TechPackRepository(prisma);

    private readonly engineeringAssetRepository =
        new EngineeringAssetRepository();

    async build(
        imageId: string,
        userId: string
    ): Promise<MasterGarmentRepresentation> {

        const upload =
            await this.uploadRepository.findById(
                imageId,
                userId
            );

        if (!upload) {
            throw new Error(
                "Image not found."
            );
        }

        const productSpecification =
            await this.specificationRepository.findLatest(
                imageId
            );

        if (!productSpecification) {
            throw new Error(
                "Product specification not found."
            );
        }

        const techPack =
            await this.techPackRepository.findLatest(
                productSpecification.id
            );

        if (!techPack) {
            throw new Error(
                "Tech Pack not found."
            );
        }

        const engineeringAssets =
            await this.engineeringAssetRepository.findByTechPackId(
                techPack.id
            );

        return {

            images: [
                upload,
            ],

            referenceImages: [
                upload.storedFilename,
            ],
            productSpecification,

            techPack,

            engineeringAssets,

            renderingContext: {

                promptVersion: "v1",

                renderStyle:
                    "TECHNICAL_LINE_ART",

                outputFormat:
                    "PNG",

            },

        };

    }

}