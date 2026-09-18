import dotenv from "dotenv";
import { GenerationService } from "./src/generation/service.js";
import type { GenerationRequest } from "./src/generation/types.js";
import {
  createProvider,
  type ProviderName,
} from "./src/providers/createProvider.js";

dotenv.config({ path: ".env.local" });

const providerName = (process.env.GENERATION_PROVIDER ?? "mock") as ProviderName;

const request: GenerationRequest = {
  prompt: "A cinematic scene at sunset",
  duration: 5,
  resolution: "720p",
  aspectRatio: "16:9",
};

async function main(): Promise<void> {
  if (providerName !== "mock" && providerName !== "higgsfield") {
    throw new Error(
      `Unknown GENERATION_PROVIDER "${providerName}". Use "mock" or "higgsfield".`,
    );
  }

  const service = new GenerationService(createProvider(providerName));
  const result = await service.generate(request);

  if (result.status !== "completed") {
    throw new Error(
      `${result.provider} generation ${result.status}: ${result.message}`,
    );
  }

  console.log(result.videoUrl);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Generation did not complete successfully: ${message}`);
  process.exitCode = 1;
});
