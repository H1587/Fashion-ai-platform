import type {
    GarmentType,
    ProjectStatus,
} from "@prisma/client";

export interface UpdateProjectDTO {
    name: string;
    description?: string;
    garmentType: GarmentType;
    status: ProjectStatus;
}