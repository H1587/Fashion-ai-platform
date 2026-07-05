import express from "express";

import {
    authenticate,
} from "../../../middleware/auth.middleware.js";

import {
    generateEngineeringAssets,
    getEngineeringAssets,
} from "../controller/engineering-asset.controller.js";

const router: express.Router =
    express.Router();

router.post(
    "/images/:id/engineering-assets",
    authenticate,
    generateEngineeringAssets
);

router.get(
    "/images/:id/engineering-assets",
    authenticate,
    getEngineeringAssets
);

export default router;