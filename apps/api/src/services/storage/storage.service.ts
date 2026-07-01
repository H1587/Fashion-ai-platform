import type { Buffer } from "node:buffer";

export interface SaveFileRequest {
    buffer: Buffer;
    originalFilename: string;
    mimeType: string;
}

export interface StoredFile {
    storedFilename: string;
    originalFilename: string;
    mimeType: string;
    size: number;
}

export interface StorageService {
    saveFile(request: SaveFileRequest): Promise<StoredFile>;

    deleteFile(storedFilename: string): Promise<void>;

    getFilePath(storedFilename: string): string;
}