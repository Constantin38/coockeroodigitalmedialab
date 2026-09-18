import type {
  CreatorWorkflow,
  CreatorWorkflowHandoff,
  CreatorWorkflowRequest,
} from "../workflows/types.js";

const DREAMINA_SEEDANCE_URL =
  "https://dreamina.capcut.com/ai-tool/home?need_login=true&type=video&model=dreamina_seedance_45_pro&workspace=0";

export class DreaminaWorkflow implements CreatorWorkflow {
  readonly name = "dreamina";

  async prepare(
    request: CreatorWorkflowRequest,
  ): Promise<CreatorWorkflowHandoff> {
    return {
      workflow: this.name,
      status: "ready_for_manual_generation",
      url: DREAMINA_SEEDANCE_URL,
      instructions: [
        "Open the Dreamina Seedance video workspace.",
        "Sign in to your own CapCut/Dreamina account if prompted.",
        "Paste the prepared prompt.",
        `Set duration to ${request.duration} seconds if the selected Dreamina model exposes that option.`,
        `Select ${request.resolution} output if available.`,
        `Select aspect ratio ${request.aspectRatio}.`,
        ...(request.referenceUrls?.length
          ? [
              `Add the ${request.referenceUrls.length} prepared reference asset(s) manually.`,
            ]
          : []),
        "Review the settings and submit the generation manually.",
        "Export or copy the resulting asset only after you have reviewed it.",
      ],
      prepared: {
        prompt: request.prompt,
        duration: request.duration,
        resolution: request.resolution,
        aspectRatio: request.aspectRatio,
        referenceUrls: request.referenceUrls ?? [],
      },
    };
  }
}
