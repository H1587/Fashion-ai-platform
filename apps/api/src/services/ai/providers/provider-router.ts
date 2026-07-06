import type {
    AIProvider,
} from "../ai-provider.js";

import {
    ProviderRegistry,
} from "./provider-registry.js";

import type {
    RenderNode,
} from "../../../modules/engineering-assets/rendering/render-planner.js";

export class ProviderRouter {

    constructor(
        private readonly registry:
            ProviderRegistry
    ) { }

    resolve(
        node: RenderNode
    ): AIProvider {

        switch (node.renderer) {

            case "MASTER_FLAT_RENDERER":

                return this.registry.get(
                    "openai"
                );

            case "SPECIALIZED_RENDERER":

                return this.registry.get(
                    "openai"
                );

            default:

                return this.registry.get(
                    "cloudflare"
                );

        }

    }

}