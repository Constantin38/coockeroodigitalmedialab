import type {
  GenerationAspectRatio,
  GenerationResolution,
} from "../generation/types.js";

export interface CreatorWorkflowRequest {
  prompt: string;
  duration: number;
  resolution: GenerationResolution;
  aspectRatio: GenerationAspectRatio;
  referenceUrls?: string[];
}

export interface CreatorWorkflowHandoff {
  workflow: string;
  status: "ready_for_manual_generation";
  url: string;
  instructions: string[];
  prepared: {
    prompt: string;
    duration: number;
    resolution: GenerationResolution;
    aspectRatio: GenerationAspectRatio;
    referenceUrls: string[];
  };
}

export interface CreatorWorkflow {
  readonly name: string;
  prepare(request: CreatorWorkflowRequest): Promise<CreatorWorkflowHandoff>;
}
