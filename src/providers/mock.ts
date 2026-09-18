import type {
  GenerationProvider,
  GenerationRequest,
  GenerationResult,
} from "../generation/types.js";

export class MockProvider implements GenerationProvider {
  readonly name = "mock";

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const encodedPrompt = encodeURIComponent(request.prompt);

    return {
      status: "completed",
      provider: this.name,
      videoUrl:
        `mock://seedance-2.5?prompt=${encodedPrompt}` +
        `&duration=${request.duration}` +
        `&resolution=${request.resolution}` +
        `&aspect_ratio=${encodeURIComponent(request.aspectRatio)}`,
    };
  }
}
