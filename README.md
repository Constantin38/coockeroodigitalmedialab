# Coockeroo Digital Media Lab

Server-side TypeScript starter for Higgsfield Seedance 2.5 text-to-video.

This repository had no existing application stack or package manager, so the initial integration uses TypeScript with npm and the official Higgsfield V2 SDK.

## Install

```bash
npm install
```

## Credentials

Create `.env.local` locally:

```env
HF_CREDENTIALS=KEY_ID:KEY_SECRET
```

Never commit `.env.local` and never expose the credential to browser/client code. The repository ignores local environment files and keeps only `.env.example`.

## Run

```bash
npm run typecheck
npm run seedance
```

The example calls:

```text
bytedance/seedance-2.5/text-to-video
```

with:

- prompt: `A cinematic scene at sunset`
- duration: `5`
- resolution: `720p`
- aspect ratio: `16:9`

The script waits for the terminal response, prints the generated video URL only after a completed request, and treats failed, canceled/cancelled, NSFW/moderated, unexpected, and URL-less responses as errors.
