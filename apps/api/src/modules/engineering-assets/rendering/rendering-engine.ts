import type {
    AIProvider,
} from "../../../services/ai/ai-provider.js";

import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    RenderingResult,
} from "../types/rendering-result.js";

import {
    RenderPlanner,
} from "./render-planner.js";

import {
    RenderGraph,
} from "./render-graph.js";

import {
    MasterFlatRenderingService,
} from "./master-flat-rendering.service.js";

import {
    SpecializedRenderingService,
} from "./specialized-rendering.service.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

import {
    RenderedAssetPersistenceService,
} from "./rendered-asset-persistence.service.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

import {
    GeminiProvider,
} from "../../../services/ai/gemini-provider.js";

import {
    PollinationsProvider,
} from "../../../services/ai/pollinations-provider.js";

import {
    QwenProvider,
} from "../../../services/ai/qwen-provider.js";

import {
    ProviderRegistry,
} from "../../../services/ai/providers/provider-registry.js";

import {
    ProviderRouter,
} from "../../../services/ai/providers/provider-router.js";

import {
    ProviderCapability,
} from "../../../services/ai/providers/provider-capability.js";

export class RenderingEngine {

    private readonly planner =
        new RenderPlanner();

    private readonly registry =
        new ProviderRegistry();

    private readonly router:
        ProviderRouter;

    private readonly persistenceService =
        new RenderedAssetPersistenceService();

    constructor(
        provider: AIProvider
    ) {

        this.registry.register(
            "google-imagen",
            new GeminiProvider(),
            [
                ProviderCapability.IMAGE_GENERATION,
                ProviderCapability.REFERENCE_IMAGES,
            ]
        );

        this.registry.register(
            "cloudflare",
            new PollinationsProvider(),
            [
                ProviderCapability.IMAGE_GENERATION,
            ]
        );

        this.registry.register(
            "qwen",
            new QwenProvider(),
            [
                ProviderCapability.IMAGE_GENERATION,
                ProviderCapability.REFERENCE_IMAGES,
            ],
        );

        this.router =
            new ProviderRouter(
                this.registry
            );

    }

    async render(
        master: MasterGarmentRepresentation
    ): Promise<RenderingResult> {

        const nodes =
            this.planner.build(
                master
            );

        const graph =
            new RenderGraph(
                nodes
            );

        const renderedAssets: RenderedAssetDTO[] = [];

        while (true) {

            const readyNodes =
                graph.getReadyNodes();

            if (readyNodes.length === 0) {
                break;
            }

            for (const node of readyNodes) {

                const provider =
                    this.router.resolve(
                        node
                    );

                switch (node.renderer) {

                    case "MASTER_FLAT_RENDERER": {

                        const renderer =
                            new MasterFlatRenderingService(
                                provider
                            );

                        master.masterFlatSketch =
                            await renderer.render(
                                master
                            );

                        break;
                    }

                    case "SPECIALIZED_RENDERER": {

                        if (!node.request) {
                            throw new Error(
                                "RenderNode request missing."
                            );
                        }

                        const renderer =
                            new SpecializedRenderingService(
                                provider
                            );

                        const response =
                            await renderer.render(
                                master,
                                node.request
                            );

                        const persisted =
                            await this.persistenceService.persist(
                                node.request.asset.id,
                                response.renderedOutput
                            );

                        renderedAssets.push(
                            ...persisted
                        );

                        break;
                    }

                    default:
                        throw new Error(
                            `Unsupported renderer: ${node.renderer}`
                        );

                }

                graph.markCompleted(
                    node.id
                );

            }

        }

        return {

            renderedAssets,

            completedNodes:
                graph.getNodes().map(
                    (node) => node.id
                ),

            failedNodes: [],

        };

    }

}