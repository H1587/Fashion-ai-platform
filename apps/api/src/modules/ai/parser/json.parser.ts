export class JsonParser {
    static parse<T>(text: string): T {
        try {
            return JSON.parse(text) as T;
        } catch {
            throw new Error("Invalid JSON returned by AI.");
        }
    }
}