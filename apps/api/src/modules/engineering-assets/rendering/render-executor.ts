import {
    RenderGraph,
} from "./render-graph.js";

import type {
    RenderNode,
} from "./render-planner.js";

export interface RenderExecutorDelegate {

    execute(
        node: RenderNode
    ): Promise<void>;

}

export class RenderExecutor {

    constructor(
        private readonly delegate:
            RenderExecutorDelegate
    ) { }

    async execute(
        graph: RenderGraph
    ): Promise<void> {

        while (true) {

            const readyNodes =
                graph.getReadyNodes();

            if (
                readyNodes.length === 0
            ) {

                break;

            }

            await Promise.all(

                readyNodes.map(
                    async (node) => {

                        node.status =
                            "RUNNING";

                        await this.delegate.execute(
                            node
                        );

                        graph.markCompleted(
                            node.id
                        );

                    }
                )

            );

        }

    }

}