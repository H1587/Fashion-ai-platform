import { TechPackAIResponseSchema } from "../validators/tech-pack-ai.validator.js";

import type {
    TechPackAIResponse,
} from "../types/tech-pack-ai-response.js";

export class TechPackAIParser {

    static parse(
        response: string
    ): TechPackAIResponse {

        const parsed =
            JSON.parse(response);

        return TechPackAIResponseSchema.parse(
            parsed
        );
    }

}