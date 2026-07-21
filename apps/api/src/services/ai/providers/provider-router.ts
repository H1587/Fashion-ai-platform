import type {
    AIProvider,
} from "../ai-provider.js";

import {
    ProviderRegistry,
} from "./provider-registry.js";

import type {
    RenderNode,
} from "../../../modules/engineering-assets/rendering/render-planner.js";

import {
    ProviderCapability,
} from "./provider-capability.js";

export class ProviderRouter {

    constructor(
        private readonly registry:
            ProviderRegistry
    ) { }

    resolve(
        node: RenderNode
    ): AIProvider {

        const requiredCapabilities =
            new Set<ProviderCapability>();

        switch (node.renderer) {

            case "MASTER_FLAT_RENDERER":

            case "SPECIALIZED_RENDERER":

                requiredCapabilities.add(
                    ProviderCapability.IMAGE_GENERATION
                );

                requiredCapabilities.add(
                    ProviderCapability.REFERENCE_IMAGES
                );

                break;

            default:

                requiredCapabilities.add(
                    ProviderCapability.IMAGE_GENERATION
                );

                break;

        }

        const provider =
            this.registry.findByCapabilities(
                requiredCapabilities
            );

        if (provider) {
            return provider;
        }

        return this.registry.get(
            "cloudflare"
        );

    }

}