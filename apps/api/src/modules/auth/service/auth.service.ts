import bcrypt, { compare } from "bcrypt";

import { LoginUserDto } from "../dto/login-user.dto.js";
import { RegisterUserDto } from "../dto/register-user.dto.js";
import { UserRepository } from "../repository/user.repository.js";
import { generateToken } from "../utils/jwt.util.js";

export class AuthService {
    private readonly userRepository = new UserRepository();

    async register(user: RegisterUserDto) {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        const passwordHash = await bcrypt.hash(user.password, 10);

        return this.userRepository.create({
            email: user.email,
            passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    }

    async login(user: LoginUserDto) {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if (!existingUser) {
            throw new Error("Invalid email or password.");
        }

        const isPasswordValid = await compare(
            user.password,
            existingUser.passwordHash
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }

        return {
            accessToken: generateToken(existingUser.id),
            user: {
                id: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
            },
        };
    }
}