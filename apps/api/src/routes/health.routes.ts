import { Router, type Router as ExpressRouter } from "express";

import { getRoot } from "../controllers/root.controller.js";
import { getHealth } from "../controllers/health.controller.js";

const router: ExpressRouter = Router();

router.get("/", getRoot);
router.get("/health", getHealth);

export default router;