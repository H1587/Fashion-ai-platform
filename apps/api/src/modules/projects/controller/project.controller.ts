import type { Request, Response } from "express";

import { ProjectService } from "../service/project.service.js";
import { createProjectSchema } from "../validators/create-project.validator.js";
import { updateProjectSchema } from "../validators/update-project.validator.js";

const projectService = new ProjectService();

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
    };
}

export async function createProject(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        const data = createProjectSchema.parse(req.body);

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const project = await projectService.create(req.user.userId, data);

        return res.status(201).json({
            message: "Project created successfully.",
            project,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create project.",
        });
    }
}

export async function getProjects(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const projects = await projectService.findAll(req.user.userId);

        return res.status(200).json({
            projects,
        });
    } catch {
        return res.status(500).json({
            message: "Failed to fetch projects.",
        });
    }
}

export async function getProjectById(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const projectId = req.params.id;

        if (!projectId || Array.isArray(projectId)) {
            return res.status(400).json({
                message: "Invalid project id.",
            });
        }

        const project = await projectService.findById(
            projectId,
            req.user.userId
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            project,
        });
    } catch {
        return res.status(500).json({
            message: "Failed to fetch project.",
        });
    }
}

export async function updateProject(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const projectId = req.params.id;

        if (!projectId || Array.isArray(projectId)) {
            return res.status(400).json({
                message: "Invalid project id.",
            });
        }

        const data = updateProjectSchema.parse(req.body);

        const project = await projectService.update(
            projectId,
            req.user.userId,
            data
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            message: "Project updated successfully.",
            project,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update project.",
        });
    }
}

export async function deleteProject(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }

        const projectId = req.params.id;

        if (!projectId || Array.isArray(projectId)) {
            return res.status(400).json({
                message: "Invalid project id.",
            });
        }

        const deleted = await projectService.delete(
            projectId,
            req.user.userId
        );

        if (!deleted) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }

        return res.status(204).send();
    } catch {
        return res.status(500).json({
            message: "Failed to delete project.",
        });
    }
}