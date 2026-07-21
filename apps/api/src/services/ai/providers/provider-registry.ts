import type {
    AIProvider,
} from "../ai-provider.js";

import {
    ProviderCapability,
} from "./provider-capability.js";

interface RegisteredProvider {

    provider: AIProvider;

    capabilities: Set<ProviderCapability>;

}

export class ProviderRegistry {

    private readonly providers =
        new Map<
            string,
            RegisteredProvider
        >();

    register(
        name: string,
        provider: AIProvider,
        capabilities: Iterable<ProviderCapability> = []
    ): void {

        this.providers.set(
            name,
            {
                provider,
                capabilities:
                    new Set(
                        capabilities
                    ),
            }
        );

    }

    get(
        name: string
    ): AIProvider {

        const provider =
            this.providers.get(
                name
            );

        if (!provider) {

            throw new Error(
                `Provider '${name}' is not registered.`
            );

        }

        return provider.provider;

    }

    list(): string[] {

        return [
            ...this.providers.keys(),
        ];

    }

    findByCapabilities(
        required: Iterable<ProviderCapability>
    ): AIProvider | undefined {

        const requiredSet =
            new Set(required);

        for (const registered of this.providers.values()) {

            const supported =
                [...requiredSet].every(
                    capability =>
                        registered.capabilities.has(
                            capability
                        )
                );

            if (supported) {
                return registered.provider;
            }

        }

        return undefined;

    }

}

