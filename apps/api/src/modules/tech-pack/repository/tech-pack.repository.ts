import {
    PrismaClient,
    type TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackRepository {
    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    async create(
        data: TechPackDTO
    ): Promise<TechPack> {
        return this.prismaClient.techPack.create({
            data: {
                specificationId: data.specificationId,

                title: data.title,

                technicalDescription:
                    data.technicalDescription,

                constructionDetails:
                    data.constructionDetails,

                fabricDetails:
                    data.fabricDetails,

                trimDetails:
                    data.trimDetails,

                measurementNotes:
                    data.measurementNotes,

                fitNotes:
                    data.fitNotes,

                careInstructions:
                    data.careInstructions,

                packagingInstructions:
                    data.packagingInstructions,

                qualityNotes:
                    data.qualityNotes,

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
                title: data.title,

                technicalDescription:
                    data.technicalDescription,

                constructionDetails:
                    data.constructionDetails,

                fabricDetails:
                    data.fabricDetails,

                trimDetails:
                    data.trimDetails,

                measurementNotes:
                    data.measurementNotes,

                fitNotes:
                    data.fitNotes,

                careInstructions:
                    data.careInstructions,

                packagingInstructions:
                    data.packagingInstructions,

                qualityNotes:
                    data.qualityNotes,

                revision:
                    data.revision,
            },
        });
    }
}