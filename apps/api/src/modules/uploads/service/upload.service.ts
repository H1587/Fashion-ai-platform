import { PrismaClient, type Image } from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";
import { LocalStorageService } from "../../../services/storage/local-storage.service.js";
import type {
    SaveFileRequest,
    StorageService,
} from "../../../services/storage/storage.service.js";
import { ProjectRepository } from "../../projects/repository/project.repository.js";
import { UploadRepository } from "../repository/upload.repository.js";

export class UploadService {
    private readonly uploadRepository: UploadRepository;
    private readonly projectRepository: ProjectRepository;
    private readonly storageService: StorageService;

    constructor(
        prismaClient: PrismaClient = prisma,
        storageService: StorageService = new LocalStorageService()
    ) {
        this.uploadRepository = new UploadRepository(prismaClient);
        this.projectRepository = new ProjectRepository(prismaClient);
        this.storageService = storageService;
    }

    async uploadImage(
        userId: string,
        projectId: string,
        file: SaveFileRequest
    ): Promise<Image> {

        const project = await this.projectRepository.findById(
            projectId,
            userId
        );

        if (!project) {
            throw new Error("Project not found.");
        }

        const storedFile = await this.storageService.saveFile(file);

        return this.uploadRepository.create({
            projectId,
            storedFilename: storedFile.storedFilename,
            originalFilename: storedFile.originalFilename,
            mimeType: storedFile.mimeType,
            size: storedFile.size,
        });
    }

    async getImage(
        id: string,
        userId: string
    ): Promise<Image | null> {
        return this.uploadRepository.findById(id, userId);
    }

    async deleteImage(
        id: string,
        userId: string
    ): Promise<Image> {
        const image = await this.uploadRepository.findById(id, userId);

        if (!image) {
            throw new Error("Image not found.");
        }

        await this.storageService.deleteFile(image.storedFilename);

        return this.uploadRepository.delete(id);
    }
}