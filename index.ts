import dotenv from "dotenv";
import { config, higgsfield } from "@higgsfield/client/v2";

dotenv.config({ path: ".env.local" });

const credentials = process.env.HF_CREDENTIALS;

if (!credentials) {
  throw new Error(
    "HF_CREDENTIALS is missing. Add it locally to .env.local in KEY_ID:KEY_SECRET format.",
  );
}

config({ credentials });

async function main(): Promise<void> {
  const result = await higgsfield.subscribe(
    "bytedance/seedance-2.5/text-to-video",
    {
      input: {
        prompt: "A cinematic scene at sunset",
        duration: 5,
        resolution: "720p",
        aspect_ratio: "16:9",
      },
      withPolling: true,
    },
  );

  const status = String(result.status).toLowerCase();

  if (status === "failed") {
    throw new Error("Seedance generation failed.");
  }

  if (status === "canceled" || status === "cancelled") {
    throw new Error("Seedance generation was canceled.");
  }

  if (status === "nsfw" || status === "moderated") {
    throw new Error("Seedance generation was stopped by moderation.");
  }

  if (status !== "completed") {
    throw new Error(`Seedance returned an unexpected terminal status: ${status}`);
  }

  const videoUrl = result.video?.url;

  if (!videoUrl) {
    throw new Error("Seedance completed without returning a video URL.");
  }

  console.log(videoUrl);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Higgsfield request did not complete successfully: ${message}`);
  process.exitCode = 1;
});
