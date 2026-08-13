# Deploying stonewave.life

Where this repository actually goes when it ships, and the two traps
that cost real time in August 2026.

---

## Hosting layout

| | |
| --- | --- |
| Repository | `JohnMcCleskey/proposals-site` |
| Vercel team | `stone-wave` (`team_7LaVAgGB6LjB4YesBOG2IDsB`) |
| Vercel project | `stonewave-preview-v2` (`prj_MZF6xGOjM8gbbIhcc7GBPhAsij1R`) |
| Production domain | `stonewave.life`, `www.stonewave.life` |
| Production branch | `main` |
| Framework | Next.js, pinned via `vercel.json` |

**This repository is connected to exactly one Vercel project.** Merging
to `main` triggers the production deployment that serves the apex
domain. Pull requests get preview deployments on the same project, and
the Vercel bot comments the preview URL on each one.

The project name is a leftover from when it was staging. It is
production now, despite reading "preview-v2". Renaming it in Vercel
would remove the trap; until then, do not assume from the name that it
is a scratch environment.

## Trap 1: the domain lived on a different project

The redesign merged to `main` and deployed cleanly, and
`stonewave.life` kept serving the previous site for hours. The apex
domain was still attached to an older Vercel project that had no
connection to this repository, so production builds here were landing
at the project's `.vercel.app` URL and nowhere else.

Fixed by moving `stonewave.life` and `www.stonewave.life` to
`stonewave-preview-v2` in Vercel (Settings, Domains). Both projects
were in the same team, so no DNS change was needed.

**If the live site looks stale after a merge, check domain ownership
before you debug the build.** In Vercel, confirm `stonewave.life` is
listed under `stonewave-preview-v2`, then confirm Settings, Git,
Production Branch reads `main`, then look at the Deployments tab for a
Production build of the merge commit. In that order. The build is
almost never the problem.

## Trap 2: agents cannot see this site

The Claude Code web environment's network policy does not allow
`stonewave.life` or `*.vercel.app`. Outbound requests fail with a 403
on the proxy CONNECT, and `api.vercel.com` is unreachable, so an agent
working in this repository cannot fetch the live site, cannot read the
Vercel API directly, and cannot confirm a deployment landed.

The Vercel MCP connector does not close this gap. It authenticates to
an identity that returns zero projects for this team, and its tool
surface has no domain management at all: it can price and buy new
domains, but cannot list, add, or move a domain on a project.

Practical consequences:

- Deployment verification is a human step. An agent can confirm the
  code is on `main` and that the build passes locally; it cannot
  confirm what the domain serves.
- Adding `stonewave.life` to the environment's egress allowlist would
  let agents verify their own deploys. See
  https://code.claude.com/docs/en/claude-code-on-the-web for how
  environment network policy is configured.

## Verifying a deploy by eye

The current design shares no surface details with the previous one, so
one glance settles it. Load the site in a private window to sidestep
cache.

| | Current | Previous |
| --- | --- | --- |
| Tab title | StoneWave. Clarity before technology. | anything else |
| Background | warm cream, navy hero | near-black |
| Eyebrow | CLARITY BEFORE TECHNOLOGY | Sovereign AI operations |
| H1 | Know what to improve. Prove it moved. | We don't ask you to trust the output. |
| Accent | orange | gold |
| Nav | Method, Proof, Work, Family | Watch it work, Ventures, How we prove it, Pricing |
| Primary CTA | Start the diagnostic | Watch the pipeline run |
| Pricing section | none | three price cards |

## Local build

```
npm install
npm run build     # next build, must pass before pushing
npm start         # serves the production build on :3000
```

If a stale `next start` is already running, kill it before restarting.
Serving an old build against new `.next` output produces 400s on the
CSS bundle and an unstyled page, which reads convincingly like a
broken deployment and is not one.
