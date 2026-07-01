import multer from "multer";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            callback(
                new Error(
                    "Only JPEG, PNG, and WebP image files are allowed."
                )
            );
            return;
        }

        callback(null, true);
    },
});