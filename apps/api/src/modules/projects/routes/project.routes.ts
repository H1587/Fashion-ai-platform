import { Router, type Router as ExpressRouter } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject,
} from "../controller/project.controller.js";

const router: ExpressRouter = Router();

router.post("/", authenticate, createProject);
router.get("/", authenticate, getProjects);
router.get("/:id", authenticate, getProjectById);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;