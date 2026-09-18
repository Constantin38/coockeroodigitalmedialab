import type {
  GenerationProvider,
  GenerationRequest,
  GenerationResult,
} from "./types.js";

export class GenerationService {
  constructor(private readonly provider: GenerationProvider) {}

  generate(request: GenerationRequest): Promise<GenerationResult> {
    return this.provider.generate(request);
  }
}
