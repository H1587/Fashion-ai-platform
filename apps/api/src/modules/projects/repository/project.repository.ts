import { PrismaClient, Project } from "@prisma/client";

import type { CreateProjectDTO } from "../dto/create-project.dto.js";
import type { UpdateProjectDTO } from "../dto/update-project.dto.js";

export class ProjectRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(
        userId: string,
        data: CreateProjectDTO
    ): Promise<Project> {
        return this.prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                userId,
            },
        });
    }

    async findAll(userId: string): Promise<Project[]> {
        return this.prisma.project.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findById(
        id: string,
        userId: string
    ): Promise<Project | null> {
        return this.prisma.project.findFirst({
            where: {
                id,
                userId,
            },
        });
    }

    async update(
        id: string,
        userId: string,
        data: UpdateProjectDTO
    ): Promise<Project | null> {
        const project = await this.findById(id, userId);

        if (!project) {
            return null;
        }

        return this.prisma.project.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                description: data.description,
                garmentType: data.garmentType,
                status: data.status,
            },
        });
    }

    async delete(
        id: string,
        userId: string
    ): Promise<boolean> {
        const project = await this.findById(id, userId);

        if (!project) {
            return false;
        }

        await this.prisma.project.delete({
            where: {
                id,
            },
        });

        return true;
    }
}