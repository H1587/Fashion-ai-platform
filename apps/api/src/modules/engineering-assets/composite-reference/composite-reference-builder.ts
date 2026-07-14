import {
    ImageSet,
} from "../image-set/image-set.js";

import type {
    CompositeReferenceSheet,
} from "./composite-reference-sheet.js";

export class CompositeReferenceBuilder {

    build(
        imageSet: ImageSet
    ): CompositeReferenceSheet {

        return {

            referenceImages:
                imageSet.referenceImages,

        };

    }

}