import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("campaigns/hermes-oud-alezan");

async function main(): Promise<void> {
  const campaign = JSON.parse(
    await fs.readFile(path.join(root, "campaign.json"), "utf8"),
  );
  const storyboard = JSON.parse(
    await fs.readFile(path.join(root, "storyboard.json"), "utf8"),
  );

  console.log(`${campaign.title}\n${campaign.disclaimer}\n`);

  for (const shot of storyboard.shots) {
    const prompt = await fs.readFile(path.join(root, shot.prompt), "utf8");

    console.log("=".repeat(72));
    console.log(`${shot.id} — ${shot.durationSeconds}s`);
    console.log(`Purpose: ${shot.purpose}`);
    console.log(`References: ${shot.references.join(", ")}`);
    console.log("-".repeat(72));
    console.log(prompt.trim());
    console.log();
  }

  console.log("Dreamina handoff:");
  console.log(
    "https://dreamina.capcut.com/ai-tool/home?need_login=true&type=video&model=dreamina_seedance_45_pro&workspace=0",
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Campaign handoff failed: ${message}`);
  process.exitCode = 1;
});
