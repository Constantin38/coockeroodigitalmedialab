export type GenerationResolution = "720p" | "1080p";
export type GenerationAspectRatio = "16:9" | "9:16" | "1:1";

export interface GenerationRequest {
  prompt: string;
  duration: number;
  resolution: GenerationResolution;
  aspectRatio: GenerationAspectRatio;
}

export type GenerationResult =
  | {
      status: "completed";
      provider: string;
      videoUrl: string;
    }
  | {
      status: "failed" | "canceled" | "moderated";
      provider: string;
      message: string;
    };

export interface GenerationProvider {
  readonly name: string;
  generate(request: GenerationRequest): Promise<GenerationResult>;
}
