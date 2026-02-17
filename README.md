## KodNest Premium Build System

A calm, intentional, premium SaaS design system for **serious B2C product UI**.

- **Design philosophy**: Calm · Intentional · Coherent · Confident  
- **No** gradients, glassmorphism, neon colors, or “animation noise”
- **Single source of truth**: `src/kodnest-premium.css`

### What’s included

- **Foundations**: typography, spacing scale, borders, radii, transitions
- **Color system** (max 4 base colors): background, text, accent, success  
  - Warning is **derived** (muted amber feel) from accent + success to avoid palette drift.
- **Required global layout shell**:
  `[Top Bar] → [Context Header] → [Primary Workspace (70%) + Secondary Panel (30%)] → [Proof Footer]`
- **Core components**: buttons, inputs, cards, badges, progress indicator, prompt box, empty/error states, proof checklist UI

### Files

- `src/kodnest-premium.css`: tokens + components + layout primitives
- `docs/DESIGN_SYSTEM.md`: rules and usage guidance (no feature work)
- `examples/page-shell.html`: full required page structure
- `examples/components.html`: component gallery

### Use (static)

Open `examples/page-shell.html` in a browser. The examples link the CSS via a relative path.

