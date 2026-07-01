import { Router, type Router as ExpressRouter } from "express";
import multer from "multer";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { uploadMiddleware } from "../../../middleware/upload.middleware.js";
import { UploadController } from "../controller/upload.controller.js";

const router: ExpressRouter = Router();

const controller = new UploadController();

router.post(
    "/",
    authenticate,
    (req, res, next) => {
        uploadMiddleware.single("image")(req, res, (error) => {
            if (!error) {
                next();
                return;
            }

            if (error instanceof multer.MulterError) {
                res.status(400).json({
                    message: error.message,
                });
                return;
            }

            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Upload failed.",
            });
        });
    },
    (req, res) => void controller.upload(req, res)
);

router.get(
    "/:id",
    authenticate,
    (req, res) => void controller.getById(req, res)
);

router.delete(
    "/:id",
    authenticate,
    (req, res) => void controller.delete(req, res)
);

export default router;