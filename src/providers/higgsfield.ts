import { config, higgsfield } from "@higgsfield/client/v2";
import type {
  GenerationProvider,
  GenerationRequest,
  GenerationResult,
} from "../generation/types.js";

const MODEL_ID = "bytedance/seedance-2.5/text-to-video";

export class HiggsfieldProvider implements GenerationProvider {
  readonly name = "higgsfield";

  constructor(credentials: string) {
    if (!credentials) {
      throw new Error(
        "HF_CREDENTIALS is required for the Higgsfield provider.",
      );
    }

    config({ credentials });
  }

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    try {
      const response = await higgsfield.subscribe(MODEL_ID, {
        input: {
          prompt: request.prompt,
          duration: request.duration,
          resolution: request.resolution,
          aspect_ratio: request.aspectRatio,
        },
        withPolling: true,
      });

      const status = String(response.status).toLowerCase();

      if (status === "completed") {
        const videoUrl = response.video?.url;

        if (!videoUrl) {
          return {
            status: "failed",
            provider: this.name,
            message: "Higgsfield completed without returning a video URL.",
          };
        }

        return {
          status: "completed",
          provider: this.name,
          videoUrl,
        };
      }

      if (status === "nsfw" || status === "moderated") {
        return {
          status: "moderated",
          provider: this.name,
          message: "Higgsfield stopped the request during moderation.",
        };
      }

      if (status === "canceled" || status === "cancelled") {
        return {
          status: "canceled",
          provider: this.name,
          message: "Higgsfield canceled the request.",
        };
      }

      return {
        status: "failed",
        provider: this.name,
        message: `Higgsfield request ended with status: ${status}.`,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      return {
        status: "failed",
        provider: this.name,
        message,
      };
    }
  }
}
