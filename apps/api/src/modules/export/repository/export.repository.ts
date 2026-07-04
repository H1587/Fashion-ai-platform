import {
    PrismaClient,
    type TechPack,
} from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

export class ExportRepository {
    constructor(
        private readonly prismaClient: PrismaClient = prisma
    ) { }

    async findTechPackById(
        techPackId: string,
        userId: string
    ): Promise<TechPack | null> {
        return this.prismaClient.techPack.findFirst({
            where: {
                id: techPackId,
                specification: {
                    image: {
                        project: {
                            userId,
                        },
                    },
                },
            },
            include: {
                specification: true,
            },
        });
    }
}