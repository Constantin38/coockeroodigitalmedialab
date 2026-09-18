# Coockeroo Digital Media Lab

Provider-based video generation layer for creative and marketing workflows.

The application separates **automated generation providers** from **creator
workflows**. This keeps API-driven generation and human-operated tools in the
same application without pretending that a creator UI is a public API.

```text
Coockeroo Digital Media Lab
│
├── Automated Generation
│   └── GenerationService
│       ├── MockProvider
│       └── HiggsfieldProvider
│           └── bytedance/seedance-2.5/text-to-video
│
└── Creator Workflows
    └── CreatorWorkflowService
        └── DreaminaWorkflow
            └── manual Seedance handoff
```

## Current stack

- TypeScript
- npm
- official Higgsfield V2 SDK: `@higgsfield/client/v2`

## Install

```bash
npm install
```

## Automated generation

The default provider is `mock`, so development does not call Higgsfield:

```bash
npm run generate
# or
npm run generate:mock
```

The mock provider exercises the same service/provider path and returns a
`mock://` URL. It does **not** prove that the hosted Seedance endpoint works.

For the hosted Higgsfield route, create `.env.local` locally:

```env
GENERATION_PROVIDER=higgsfield
HF_CREDENTIALS=KEY_ID:KEY_SECRET
```

Never commit `.env.local` and never expose `HF_CREDENTIALS` to browser code.

Run:

```bash
npm run generate:higgsfield
```

The current example uses:

- model: `bytedance/seedance-2.5/text-to-video`
- prompt: `A cinematic scene at sunset`
- duration: `5`
- resolution: `720p`
- aspect ratio: `16:9`

## Dreamina / CapCut creator workflow

Dreamina is represented as a **creator workflow**, not as an automated provider.

Run:

```bash
npm run workflow:dreamina
```

The workflow prepares:

- prompt
- duration
- resolution
- aspect ratio
- optional reference URLs
- a direct Dreamina Seedance workspace URL
- a manual execution checklist

It deliberately does **not** reverse-engineer Dreamina private endpoints,
session cookies, or browser requests. The user remains in control of login,
settings review, generation submission, and export.

This lets the application use Dreamina as a low-cost/manual creative route
while preserving a clean API abstraction for automated providers.

## Type check

```bash
npm run typecheck
```

## Architecture rule

Business logic should depend on either:

- `GenerationProvider` for automated, machine-to-machine generation; or
- `CreatorWorkflow` for human-operated creative tools.

Adding another hosted API, local model, or creator UI therefore requires a new
adapter rather than changes throughout the application.
