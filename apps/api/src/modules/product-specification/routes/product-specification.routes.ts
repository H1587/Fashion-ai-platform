import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";

import {
    generateProductSpecification,
    getProductSpecification,
} from "../controller/product-specification.controller.js";

const router: express.Router = express.Router();

router.post(
    "/images/:id/specification",
    authenticate,
    generateProductSpecification
);

router.get(
    "/images/:id/specification",
    authenticate,
    getProductSpecification
);

export default router;