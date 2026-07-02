import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";

import {
    analyzeImage,
    getAnalysis,
} from "../controller/ai.controller.js";

const router: express.Router = express.Router();

router.post(
    "/images/:id/analyze",
    authenticate,
    analyzeImage
);

router.get(
    "/images/:id/analysis",
    authenticate,
    getAnalysis
);

export default router;