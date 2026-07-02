import { JsonParser } from "./json.parser.js";
import {
    garmentAnalysisSchema,
    type GarmentAnalysisDTO,
} from "../validators/index.js";

export class GarmentAnalysisParser {
    static parse(text: string): GarmentAnalysisDTO {
        const json = JsonParser.parse<unknown>(text);

        return garmentAnalysisSchema.parse(json);
    }
}