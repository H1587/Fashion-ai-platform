import type {
    RenderNode,
} from "./render-planner.js";

export class RenderGraph {

    constructor(
        private readonly nodes: RenderNode[]
    ) { }

    getNodes(): RenderNode[] {

        return this.nodes;

    }

    getReadyNodes(): RenderNode[] {

        return this.nodes.filter(
            (node) =>
                node.status === "PENDING" &&
                node.dependsOn.every(
                    (dependencyId) =>
                        this.nodes.some(
                            (dependency) =>
                                dependency.id === dependencyId &&
                                dependency.status === "COMPLETED"
                        )
                )
        );

    }

    markCompleted(
        nodeId: string
    ): void {

        const node =
            this.nodes.find(
                (candidate) =>
                    candidate.id === nodeId
            );

        if (node) {

            node.status =
                "COMPLETED";

        }

    }

}