import type { GenerationProvider } from "../generation/types.js";
import { HiggsfieldProvider } from "./higgsfield.js";
import { MockProvider } from "./mock.js";

export type ProviderName = "mock" | "higgsfield";

export function createProvider(name: ProviderName): GenerationProvider {
  switch (name) {
    case "mock":
      return new MockProvider();

    case "higgsfield": {
      const credentials = process.env.HF_CREDENTIALS;

      if (!credentials) {
        throw new Error(
          "HF_CREDENTIALS is missing. Add it locally to .env.local in KEY_ID:KEY_SECRET format.",
        );
      }

      return new HiggsfieldProvider(credentials);
    }
  }
}
