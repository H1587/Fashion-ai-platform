import { User } from "@prisma/client";

import { prisma } from "../../../lib/prisma.js";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: {
        email: string;
        passwordHash: string;
        firstName?: string;
        lastName?: string;
    }): Promise<User> {
        return prisma.user.create({
            data,
        });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }
}