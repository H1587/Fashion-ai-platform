export type RenderedAssetFormat =
    | "PNG"
    | "JPEG"
    | "SVG";

export type RenderStyle =
    | "TECHNICAL_LINE_ART"
    | "FLAT_SKETCH"
    | "DETAIL_ILLUSTRATION";

export interface RenderedAssetDTO {

    engineeringAssetId: string;

    format: RenderedAssetFormat;

    mimeType: string;

    filename?: string;

    storageLocation?: string;

    width?: number;

    height?: number;

    promptVersion?: string;

    provider?: string;

    providerModel?: string;

    providerMetadata?: Record<string, unknown>;

    revision?: number;

}