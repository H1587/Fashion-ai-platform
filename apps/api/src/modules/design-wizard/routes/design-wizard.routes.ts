import express from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";

import {
    getDesignWizard,
    updateDesignWizard,
} from "../controller/design-wizard.controller.js";

const router: express.Router = express.Router();

router.get(
    "/images/:id",
    authenticate,
    getDesignWizard
);

router.patch(
    "/images/:id",
    authenticate,
    updateDesignWizard
);

export default router;