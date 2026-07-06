import { mkdir, writeFile } from "node:fs/promises";

import path from "node:path";

import { randomUUID } from "node:crypto";

export class RenderedAssetStorageService {

    async saveImage(
        base64: string,
        extension: string
    ) {

        const directory =
            path.resolve(
                "uploads",
                "rendered-assets"
            );

        await mkdir(
            directory,
            {
                recursive: true,
            }
        );

        const filename =
            `${randomUUID()}.${extension}`;

        const storageLocation =
            path.join(
                directory,
                filename
            );

        const imageBuffer =
            Buffer.from(
                base64,
                "base64"
            );

        await writeFile(
            storageLocation,
            imageBuffer
        );

        return {

            filename,

            storageLocation,

        };

    }

}