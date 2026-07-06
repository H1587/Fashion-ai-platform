import express from "express";

import {
    authenticate,
} from "../../../middleware/auth.middleware.js";

import {
    renderEngineeringAssets,
    getRenderedEngineeringAssets,
} from "../controller/engineering-asset-rendering.controller.js";

const router: express.Router =
    express.Router();

router.post(
    "/images/:id/rendered-assets",
    authenticate,
    renderEngineeringAssets
);

router.get(
    "/images/:id/rendered-assets",
    authenticate,
    getRenderedEngineeringAssets
);

export default router;