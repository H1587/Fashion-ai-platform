export type RenderedAssetFormat =
    | "PNG"
    | "JPEG"
    | "SVG";

export type RenderStyle =
    | "TECHNICAL_LINE_ART"
    | "FLAT_SKETCH"
    | "DETAIL_ILLUSTRATION";

export interface RenderedAsset {

    format: RenderedAssetFormat;

    renderStyle: RenderStyle;

}