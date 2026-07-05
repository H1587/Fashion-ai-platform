import {
    Prisma,
    PrismaClient,
    type EngineeringAsset,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import type {
    EngineeringAssetDTO,
} from "../dto/engineering-asset.dto.js";

export class EngineeringAssetRepository {

    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    private toJson(
        value: unknown
    ): Prisma.InputJsonValue | undefined {

        return value === undefined
            ? undefined
            : value as Prisma.InputJsonValue;
    }

    async createMany(
        assets: EngineeringAssetDTO[]
    ): Promise<EngineeringAsset[]> {

        const created: EngineeringAsset[] = [];

        for (const asset of assets) {

            created.push(
                await this.prismaClient.engineeringAsset.create({
                    data: {
                        techPackId: asset.techPackId,

                        assetType: asset.assetType,

                        title: asset.title,

                        description: asset.description,

                        assetData: this.toJson(
                            asset.assetData
                        ),

                        revision: asset.revision ?? 1,
                    },
                })
            );
        }

        return created;
    }

    async findByTechPackId(
        techPackId: string
    ): Promise<EngineeringAsset[]> {

        return this.prismaClient.engineeringAsset.findMany({
            where: {
                techPackId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

}