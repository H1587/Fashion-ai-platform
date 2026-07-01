import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type {
    SaveFileRequest,
    StorageService,
    StoredFile,
} from "./storage.service.js";

export class LocalStorageService implements StorageService {
    private readonly uploadDirectory = path.resolve("uploads");

    async saveFile(request: SaveFileRequest): Promise<StoredFile> {
        await fs.mkdir(this.uploadDirectory, { recursive: true });

        const extension = path.extname(request.originalFilename);
        const storedFilename = `${randomUUID()}${extension}`;

        const filePath = path.join(this.uploadDirectory, storedFilename);

        await fs.writeFile(filePath, request.buffer);

        return {
            storedFilename,
            originalFilename: request.originalFilename,
            mimeType: request.mimeType,
            size: request.buffer.length,
        };
    }

    async deleteFile(storedFilename: string): Promise<void> {
        const filePath = path.join(this.uploadDirectory, storedFilename);

        await fs.rm(filePath, { force: true });
    }

    getFilePath(storedFilename: string): string {
        return path.join(this.uploadDirectory, storedFilename);
    }
}