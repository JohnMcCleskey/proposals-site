# Deploying stonewave.life

Where this repository actually goes when it ships, and the two traps
that cost real time in August 2026.

---

## Hosting layout

| | |
| --- | --- |
| Repository | `JohnMcCleskey/proposals-site` |
| Vercel team | `stone-wave` (`team_7LaVAgGB6LjB4YesBOG2IDsB`) |
| Serving project | `stonewave-preview-v2` (`prj_MZF6xGOjM8gbbIhcc7GBPhAsij1R`) |
| Also connected | `proposals-site` (`prj_YtJFdrK9SrAe3jIlXU2r4UyDUrhw`) |
| Production domain | `stonewave.life`, `www.stonewave.life` |
| Production branch | `main` |
| Framework | Next.js, pinned via `vercel.json` |

`stonewave.life` is served by **`stonewave-preview-v2`**. Merging to
`main` triggers the production deployment behind the apex domain.

That project's name is a leftover from when it was staging. It is
production now, despite reading "preview-v2". Renaming it in Vercel
would remove the trap; until then, do not assume from the name that it
is a scratch environment.

**Two projects build from this repository**, not one. As of 13 Aug 2026
every push produces a deployment on both `stonewave-preview-v2` and
`proposals-site`, and the Vercel bot comments both preview URLs on each
pull request. Only the first one is wired to the domain.

This is worth resolving rather than living with. Two builds per push
doubles build minutes, and if the `proposals-site` project also has
`main` as its production branch it is publishing the same commits to a
second production URL. Either disconnect that project from the
repository (Vercel, Settings, Git, Disconnect) or keep it deliberately
and record why here.

## Trap 1: the domain lived on a different project

The redesign merged to `main` and deployed cleanly, and
`stonewave.life` kept serving the previous site for hours. The apex
domain was attached to a different Vercel project, so production builds
from this repository were landing at `stonewave-preview-v2`'s
`.vercel.app` URL and nowhere the public could see.

The signal that misled the diagnosis: on pull requests #3 and #4 the
Vercel bot listed only `stonewave-preview-v2`, which made it look like
the repository fed exactly one project and the domain therefore sat on
something unconnected. By #5 the bot was listing `proposals-site` too.
So a project can be attached to the repository and still be absent from
that table.

There are at least two ways that happens, and both have bitten:

- The project's builds are paused or ignored, so it never appears.
- The comment is posted before every project's build registers. The
  bot edits the same comment in place as each one lands, so a table
  read seconds after a push can show one project and a table read a
  minute later shows two.

**Do not infer the set of connected projects from the bot comment, in
either direction.** A project missing from it is not disconnected, and
the table is not an inventory. Read it from the Vercel dashboard.

Fixed by moving `stonewave.life` and `www.stonewave.life` to
`stonewave-preview-v2` in Vercel (Settings, Domains). Both projects
were in the same team, so no DNS change was needed.

**If the live site looks stale after a merge, check domain ownership
before you debug the build.** In Vercel, confirm `stonewave.life` is
listed under `stonewave-preview-v2` and not on a sibling project, then
confirm Settings, Git, Production Branch reads `main`, then look at the
Deployments tab for a Production build of the merge commit. In that
order. The build is almost never the problem.

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
