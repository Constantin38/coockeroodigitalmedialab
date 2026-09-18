# Coockeroo Digital Media Lab

Provider-based video generation layer for creative and marketing workflows.

The application is intentionally not coupled to a single AI vendor. A small
`GenerationService` talks to a provider interface, while each vendor or local
runtime is implemented as an adapter.

```text
GenerationService
├── MockProvider
├── HiggsfieldProvider
│   └── bytedance/seedance-2.5/text-to-video
└── future local / third-party providers
```

## Current stack

- TypeScript
- npm
- official Higgsfield V2 SDK: `@higgsfield/client/v2`

## Install

```bash
npm install
```

## Non-billable development mode

The default provider is `mock`, so development does not call Higgsfield:

```bash
npm run generate
# or
npm run generate:mock
```

The mock provider exercises the same service/provider path and returns a
`mock://` URL. It does **not** prove that the hosted Seedance endpoint works.

## Higgsfield mode

Create `.env.local` locally:

```env
GENERATION_PROVIDER=higgsfield
HF_CREDENTIALS=KEY_ID:KEY_SECRET
```

Never commit `.env.local` and never expose `HF_CREDENTIALS` to browser code.

Run:

```bash
npm run generate:higgsfield
```

This is the billable hosted path and uses:

```text
bytedance/seedance-2.5/text-to-video
```

with the current example request:

- prompt: `A cinematic scene at sunset`
- duration: `5`
- resolution: `720p`
- aspect ratio: `16:9`

The Higgsfield adapter uses `subscribe(..., { withPolling: true })` and maps
terminal responses into the provider-neutral result model. It reports failed,
canceled/cancelled, and moderation/NSFW outcomes without claiming success.

## Type check

```bash
npm run typecheck
```

## Architecture

The business logic depends only on `GenerationProvider`, not on Higgsfield.
That makes it possible to add self-hosted models or another API later without
rewriting the application layer.
