---
name: dipdesigns-vibe
description: "From a short vibe to a live HTML preview and complete backend handoff.md — one skill, full pipeline. Works with any LLM, targets any stack."
metadata:
  openclaw:
    emoji: "🎨"
    requires:
      bins: [curl]
tags: [ui-design, frontend, html, backend, handoff, prototyping, full-stack]
version: 1.0.0
author: "DipDesigns"
license: "proprietary"
---

# DipDesigns Vibe

Transform a short UI description into a production-ready HTML page and a complete backend handoff.md specification. One prompt, full pipeline.

## How It Works

The skill follows a three-stage pipeline:

1. **Vibe Expander** — short inputs (<15 words) are matched against 12 keyword categories and expanded into detailed 100-200 word UI specs. Longer inputs pass through as-is.
2. **Live Preview** — using the expanded prompt, generate a complete, responsive HTML/CSS page matching the specification. Include layout, colors, typography, components, and interactions.
3. **Handoff.md** — optionally generate a backend specification document covering data models, API routes, authentication flows, database schema, and deployment notes — targeted to the user's chosen stack.

## Prerequisites

- An OpenClaw agent connected to an LLM (GPT-4o, Claude Sonnet, Gemini, Llama, or any OpenRouter model)
- The `curl` binary available to the agent

## Usage

### Basic — generate a UI from a short vibe

```
User: dark analytics dashboard
Agent: [expands vibe → generates HTML preview → presents result]
```

### Full — generate UI + backend handoff

```
User: build me a SaaS landing page, handoff for node-express
Agent: [expands vibe → generates HTML → generates handoff.md]
```

### Long prompts pass through

```
User: Build a dark-themed project management dashboard with a sidebar navigation, a kanban board in the center, a team chat widget on the right, and a top bar with search and notifications.
Agent: [prompt passes through → generates HTML → presents result]
```

## Vibe Expansion Categories

When the user provides a short input (under 15 words), map it to the most relevant category and expand it into a full detailed spec:

| Keyword | Expanded Direction |
|---------|-------------------|
| dashboard, analytics, stats | Dark analytics dashboard with charts, KPIs, sidebar navigation |
| landing, landing page, saas | Modern SaaS landing page with hero, features, testimonials, CTA |
| chat, messaging, ai chat | Dark AI chat interface with message bubbles, model selector, typing indicator |
| pricing, pricing page, plans | Pricing page with tiered cards, feature comparison, annual/monthly toggle |
| auth, login, signup, login page | Login + signup flow with social auth buttons, form validation |
| ecommerce, shop, store | Product listing page with cart, filters, search |
| kanban, board, trello | Kanban board with drag-drop columns, cards, tags |
| settings, preferences | Settings page with tabbed sections, toggles, form inputs |
| portfolio, creative, showcase | Creative portfolio with project grid, lightbox, contact form |
| calendar, schedule, events | Calendar view with events, day/week/month toggles |
| docs, documentation, api docs | Documentation layout with sidebar, search, code blocks |
| music, player, audio | Music player interface with playlist, now-playing bar, controls |

### Generic expansion for unlisted short inputs

Wrap the short input in a full prompt structure:
```
Build a detailed [user's phrase]. Include layout structure, color scheme, component list, interaction patterns, responsive behavior, and any relevant UI patterns. Use a dark theme on #070b12 background with clean typography and subtle glass-morphism surfaces unless the user specifies otherwise.
```

## HTML Generation Guidelines

When generating the preview:

1. **Single self-contained HTML file** — include all CSS in a `<style>` block, no external dependencies (use CDN links for fonts/icons if needed via `<link>`)
2. **Responsive** — use CSS Grid/Flexbox, include a `@media(max-width:768px)` breakpoint
3. **Dark theme default** — use `#070b12` background, `#1a2332` surface, `rgba(255,255,255,0.06)` borders, clean typography
4. **Realistic content** — use lorem-style placeholder text, realistic data samples, proper icons (SVG or Unicode)
5. **Interactivity** — include hover states, transitions, and any UI patterns the specification calls for
6. **Accessibility** — proper contrast, focus states, semantic HTML where possible

## Handoff.md Generation

When the user requests a backend handoff (or includes a stack target), generate a structured markdown document:

```markdown
# Backend Handoff

## Stack
[user-specified or agnostic]

## Data Models
[entities, fields, types, relations]

## API Routes
[endpoints, methods, request/response shapes]

## Authentication
[auth flow, session management, social providers]

## Database Schema
[tables, indexes, migrations outline]

## Environment Variables
[config keys needed]

## Deployment Notes
[platform-specific instructions]
```

Supported stack targets: agnostic, cloudflare, node-express, supabase, fastapi, nextjs, firebase, django, rails.

## Examples

### Example 1: Short vibe to preview

**User:** `pricing page`

**Agent expands to:**
> Build a dark-themed pricing page on #070b12 background. Three columns: Free ($0), Pro ($29/mo, highlighted with teal border and "Most Popular" badge), Enterprise ($99/mo). Each card shows price, feature list with check icons, and a CTA button (filled for Pro, outlined for others). Add a monthly/annual toggle showing 20% savings. Responsive — stacks vertically on mobile.

**Agent:** Generates the full HTML/CSS page and presents it.

### Example 2: Full pipeline with handoff

**User:** `Build a user management dashboard. handoff for supabase.`

**Agent:** Expands the vibe → generates the HTML preview → generates handoff.md with Supabase-specific data models, Row Level Security policies, and API routes.

## Configuration

No API keys or external services required. The skill runs entirely through your OpenClaw agent's connected LLM.

## Support

Issues: https://github.com/amemecometru/dipdesigns-vibe/issues
