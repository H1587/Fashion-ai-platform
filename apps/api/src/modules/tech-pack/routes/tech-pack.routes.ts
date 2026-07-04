import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";

import {
    generateTechPack,
    getTechPack,
    updateTechPack,
} from "../controller/tech-pack.controller.js";

const router: express.Router = express.Router();

router.post(
    "/images/:id/tech-pack",
    authenticate,
    generateTechPack
);

router.get(
    "/images/:id/tech-pack",
    authenticate,
    getTechPack
);

router.put(
    "/:id",
    authenticate,
    updateTechPack
);

export default router;