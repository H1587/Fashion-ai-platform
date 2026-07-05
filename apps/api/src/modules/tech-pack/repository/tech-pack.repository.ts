import {
    Prisma,
    PrismaClient,
    type TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackRepository {
    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    private toJson(
        value: unknown
    ): Prisma.InputJsonValue | undefined {
        return value === undefined
            ? undefined
            : (value as Prisma.InputJsonValue);
    }

    async create(
        data: TechPackDTO
    ): Promise<TechPack> {
        return this.prismaClient.techPack.create({
            data: {
                specificationId: data.specificationId,

                title: data.title,

                technicalDescription:
                    data.technicalDescription,

                // -----------------------------------------------------------------
                // Sprint 9 structured engineering sections
                // -----------------------------------------------------------------

                garmentIdentification:
                    this.toJson(data.garmentIdentification),

                constructionSpecification:
                    this.toJson(data.constructionSpecification),

                fabricSpecification:
                    this.toJson(data.fabricSpecification),

                trimSpecification:
                    this.toJson(data.trimSpecification),

                stitchSpecification:
                    this.toJson(data.stitchSpecification),

                seamSpecification:
                    this.toJson(data.seamSpecification),

                fitSpecification:
                    this.toJson(data.fitSpecification),

                manufacturingNotes:
                    this.toJson(data.manufacturingNotes),

                careSpecification:
                    this.toJson(data.careSpecification),

                packagingSpecification:
                    this.toJson(data.packagingSpecification),

                qualityChecklist:
                    this.toJson(data.qualityChecklist),

                revision:
                    data.revision ?? 1,
            },
        });
    }

    async findLatest(
        specificationId: string
    ): Promise<TechPack | null> {
        return this.prismaClient.techPack.findFirst({
            where: {
                specificationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findById(
        id: string
    ): Promise<TechPack | null> {
        return this.prismaClient.techPack.findUnique({
            where: {
                id,
            },
        });
    }

    async findByIdAndUserId(
        id: string,
        userId: string
    ): Promise<TechPack | null> {
        return this.prismaClient.techPack.findFirst({
            where: {
                id,
                specification: {
                    image: {
                        project: {
                            userId,
                        },
                    },
                },
            },
        });
    }

    async update(
        id: string,
        data: Partial<TechPackDTO>
    ): Promise<TechPack> {
        return this.prismaClient.techPack.update({
            where: {
                id,
            },
            data: {
                title:
                    data.title,

                technicalDescription:
                    data.technicalDescription,

                garmentIdentification:
                    this.toJson(data.garmentIdentification),

                constructionSpecification:
                    this.toJson(data.constructionSpecification),

                fabricSpecification:
                    this.toJson(data.fabricSpecification),

                trimSpecification:
                    this.toJson(data.trimSpecification),

                stitchSpecification:
                    this.toJson(data.stitchSpecification),

                seamSpecification:
                    this.toJson(data.seamSpecification),

                fitSpecification:
                    this.toJson(data.fitSpecification),

                manufacturingNotes:
                    this.toJson(data.manufacturingNotes),

                careSpecification:
                    this.toJson(data.careSpecification),

                packagingSpecification:
                    this.toJson(data.packagingSpecification),

                qualityChecklist:
                    this.toJson(data.qualityChecklist),

                revision:
                    data.revision,
            },
        });
    }
}