import {
    PrismaClient,
    type ProductSpecification,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

export interface UpdateDesignWizardData {
    productName?: string;
    productCategory?: string;
    productType?: string;

    gender?: string;

    primaryColour?: string;
    secondaryColour?: string;

    fabric?: string;
    pattern?: string;

    fit?: string;

    sleeve?: string;
    collar?: string;
    closure?: string;
    pocket?: string;

    season?: string;
    style?: string;

    description?: string;

    keyFeatures?: unknown;

    manufacturingNotes?: string;
}

export class DesignWizardRepository {
    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    async findByImageId(
        imageId: string
    ): Promise<ProductSpecification | null> {
        return this.prismaClient.productSpecification.findFirst({
            where: {
                imageId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async update(
        id: string,
        data: UpdateDesignWizardData
    ): Promise<ProductSpecification> {
        return this.prismaClient.productSpecification.update({
            where: {
                id,
            },
            data: {
                productName: data.productName,
                productCategory: data.productCategory,
                productType: data.productType,

                gender: data.gender,

                primaryColour: data.primaryColour,
                secondaryColour: data.secondaryColour,

                fabric: data.fabric,
                pattern: data.pattern,

                fit: data.fit,

                sleeve: data.sleeve,
                collar: data.collar,
                closure: data.closure,
                pocket: data.pocket,

                season: data.season,
                style: data.style,

                description: data.description,

                keyFeatures: data.keyFeatures as object | undefined,

                manufacturingNotes: data.manufacturingNotes,
            },
        });
    }
}