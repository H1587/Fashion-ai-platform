import { GarmentType, ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const updateProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Project name is required.")
        .max(100, "Project name cannot exceed 100 characters."),

    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters.")
        .optional(),

    garmentType: z.nativeEnum(GarmentType),

    status: z.nativeEnum(ProjectStatus),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;