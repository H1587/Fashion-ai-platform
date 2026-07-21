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

    private static readonly PROVIDER_PREFERENCE = [
        "openai",
        "qwen",
        "google-imagen",
        "cloudflare",
    ] as const;

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

        for (
            const providerName of
            ProviderRouter.PROVIDER_PREFERENCE
        ) {

            if (
                this.registry.hasCapabilities(
                    providerName,
                    requiredCapabilities,
                )
            ) {

                return this.registry.get(
                    providerName,
                );

            }

        }

        throw new Error(
            "No provider satisfies the required capabilities.",
        );

    }

}