import { Image, PrismaClient } from "@prisma/client";

export class UploadRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(data: {
        projectId: string;
        storedFilename: string;
        originalFilename: string;
        mimeType: string;
        size: number;
    }): Promise<Image> {
        return this.prisma.image.create({
            data,
        });
    }

    async findById(
        id: string,
        userId: string
    ): Promise<Image | null> {
        return this.prisma.image.findFirst({
            where: {
                id,
                project: {
                    userId,
                },
            },
        });
    }

    async delete(id: string): Promise<Image> {
        return this.prisma.image.delete({
            where: {
                id,
            },
        });
    }
}