import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";

import {
    exportPdf,
    exportDocx,
} from "../controller/export.controller.js";

const router: express.Router = express.Router();

router.post(
    "/tech-pack/:id/pdf",
    authenticate,
    exportPdf
);

router.post(
    "/tech-pack/:id/docx",
    authenticate,
    exportDocx
);

export default router;