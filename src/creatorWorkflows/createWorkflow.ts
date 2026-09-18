import type { CreatorWorkflow } from "../workflows/types.js";
import { DreaminaWorkflow } from "./dreamina.js";

export type CreatorWorkflowName = "dreamina";

export function createCreatorWorkflow(
  name: CreatorWorkflowName,
): CreatorWorkflow {
  switch (name) {
    case "dreamina":
      return new DreaminaWorkflow();
  }
}
