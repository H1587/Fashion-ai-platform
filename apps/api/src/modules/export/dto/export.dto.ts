export type ExportFormat =
    | "pdf"
    | "docx";

export interface ExportResultDTO {
    filename: string;

    mimeType: string;

    buffer: Buffer;
}