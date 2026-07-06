import {
    Prisma,
    PrismaClient,
    type RenderedAsset,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

export class RenderedAssetRepository {

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

    async create(
        asset: RenderedAssetDTO
    ): Promise<RenderedAsset> {

        return this.prismaClient.renderedAsset.create({
            data: {
                engineeringAssetId: asset.engineeringAssetId,

                format: asset.format,

                mimeType: asset.mimeType,

                filename: asset.filename,

                storageLocation: asset.storageLocation,

                width: asset.width,

                height: asset.height,

                promptVersion: asset.promptVersion,

                provider: asset.provider,

                providerModel: asset.providerModel,

                providerMetadata: this.toJson(
                    asset.providerMetadata
                ),

                revision: asset.revision ?? 1,
            },
        });
    }

    async createMany(
        assets: RenderedAssetDTO[]
    ): Promise<RenderedAsset[]> {

        const created: RenderedAsset[] = [];

        for (const asset of assets) {

            created.push(
                await this.create(asset)
            );

        }

        return created;
    }

    async findByEngineeringAssetId(
        engineeringAssetId: string
    ): Promise<RenderedAsset[]> {

        return this.prismaClient.renderedAsset.findMany({
            where: {
                engineeringAssetId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

}