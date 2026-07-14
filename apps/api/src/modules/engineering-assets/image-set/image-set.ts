import type {
    Image,
} from "@prisma/client";

export class ImageSet {

    constructor(
        public readonly images: Image[]
    ) { }

    get front(): Image | undefined {

        return this.images[0];

    }

    get back(): Image | undefined {

        return this.images[1];

    }

    get side(): Image | undefined {

        return this.images[2];

    }

    get details(): Image[] {

        return this.images.slice(3);

    }

    get referenceImages(): string[] {

        return this.images.map(
            image => image.storedFilename
        );

    }

}