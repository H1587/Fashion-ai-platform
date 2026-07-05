export enum EngineeringAssetType {
    FLAT_SKETCH = "FLAT_SKETCH",

    TECHNICAL_SKETCH = "TECHNICAL_SKETCH",

    COLLAR_DETAIL = "COLLAR_DETAIL",

    SLEEVE_DETAIL = "SLEEVE_DETAIL",

    POCKET_DETAIL = "POCKET_DETAIL",

    PLACKET_DETAIL = "PLACKET_DETAIL",

    BUTTON_DETAIL = "BUTTON_DETAIL",

    CONSTRUCTION_ILLUSTRATION = "CONSTRUCTION_ILLUSTRATION",

    REFERENCE_IMAGE = "REFERENCE_IMAGE",
}

export interface EngineeringAssetDTO {
    techPackId: string;

    assetType: EngineeringAssetType;

    title?: string;

    description?: string;

    assetData?: Record<string, unknown>;

    revision?: number;
}