import type { Project } from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";
import type { CreateProjectDTO } from "../dto/create-project.dto.js";
import type { UpdateProjectDTO } from "../dto/update-project.dto.js";
import { ProjectRepository } from "../repository/project.repository.js";

export class ProjectService {
    private readonly projectRepository = new ProjectRepository(prisma);

    async create(
        userId: string,
        project: CreateProjectDTO
    ): Promise<Project> {
        return this.projectRepository.create(userId, project);
    }

    async findAll(userId: string): Promise<Project[]> {
        return this.projectRepository.findAll(userId);
    }

    async findById(
        id: string,
        userId: string
    ): Promise<Project | null> {
        return this.projectRepository.findById(id, userId);
    }

    async update(
        id: string,
        userId: string,
        project: UpdateProjectDTO
    ): Promise<Project | null> {
        return this.projectRepository.update(id, userId, project);
    }

    async delete(
        id: string,
        userId: string
    ): Promise<boolean> {
        return this.projectRepository.delete(id, userId);
    }
}