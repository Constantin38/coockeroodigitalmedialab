import type {
  CreatorWorkflow,
  CreatorWorkflowHandoff,
  CreatorWorkflowRequest,
} from "./types.js";

export class CreatorWorkflowService {
  constructor(private readonly workflow: CreatorWorkflow) {}

  prepare(
    request: CreatorWorkflowRequest,
  ): Promise<CreatorWorkflowHandoff> {
    return this.workflow.prepare(request);
  }
}
