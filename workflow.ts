import { CreatorWorkflowService } from "./src/workflows/service.js";
import type { CreatorWorkflowRequest } from "./src/workflows/types.js";
import {
  createCreatorWorkflow,
  type CreatorWorkflowName,
} from "./src/creatorWorkflows/createWorkflow.js";

const workflowName = "dreamina" satisfies CreatorWorkflowName;

const request: CreatorWorkflowRequest = {
  prompt: "A cinematic scene at sunset",
  duration: 5,
  resolution: "720p",
  aspectRatio: "16:9",
};

async function main(): Promise<void> {
  const service = new CreatorWorkflowService(
    createCreatorWorkflow(workflowName),
  );

  const handoff = await service.prepare(request);

  console.log(
    JSON.stringify(
      {
        workflow: handoff.workflow,
        status: handoff.status,
        url: handoff.url,
        prepared: handoff.prepared,
        instructions: handoff.instructions,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Creator workflow preparation failed: ${message}`);
  process.exitCode = 1;
});
