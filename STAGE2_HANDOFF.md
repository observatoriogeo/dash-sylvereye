# Docs migration & GitHub Pages cutover — handoff

**Date:** 2026-05-24
**Run mode:** unattended (authorized by the user)
**Outcome:** ✅ green — site live and serving from GitHub Pages

## What shipped

Two-stage migration delivered as **PR #2** (squash-merged to `main`):
<https://github.com/observatoriogeo/dash-sylvereye/pull/2>

### Stage 1 — Docusaurus migration into `website/`

- Source: `albertogarob/dash-sylvereye-docs` (separate repo, Docusaurus 3.10, previously hosted on Albatross via `dash-sylvereye-docs-alba`).
- Imported into `website/`, flattening the source's `website/` + sibling `../docs` layout into a self-contained `website/` with docs under `website/docs/`.
- Removed Docusaurus-v1 legacy artifacts (`pages/en/`, `core/`, `siteConfig.js`, `sidebars.json`).
- Adapted `docusaurus.config.js`: `url` → `https://dashsylvereye.observatoriogeo.mx`, `projectName` → `dash-sylvereye`, `path: '../docs'` → `path: 'docs'`, added `editUrl` pointing at this repo.
- `website/static/CNAME` pins the custom domain.
- Commit: `71685bb Migrate Docusaurus 3 docs site into website/`.

### Stage 2 — GitHub Pages workflow + reusable skill

- `.github/workflows/docs-deploy.yml` — push-to-main + `workflow_dispatch` triggers; build job (`actions/checkout@v4`, `actions/setup-node@v4` Node 20 with `website/package-lock.json` cache, `npm ci`, `npm run build`, `actions/upload-pages-artifact@v3`); deploy job (`actions/deploy-pages@v4`). Adapted from `observatoriogeo/whistlerlib`'s workflow with no structural changes (only the project context differs).
- `.claude/skills/docs-deploy/SKILL.md` — project-scoped skill (so contributors with Claude Code pick it up automatically). Mirrors Whistlerlib's `docs-deploy` skill — four-phase deploy loop, standalone sync-check entry point, seven failure-mode recipes, debugging walk from outside in. Whistlerlib-specific content removed (no `scripts/sync_tutorials.py`, no project-wide em-dash CI rule here).
- Commit: `a4e4602 Add GitHub Pages deploy workflow and docs-deploy skill`.

## Live site

| Probe | URL | Result |
|---|---|---|
| Root (HTTPS) | <https://dashsylvereye.observatoriogeo.mx/> | 200, `<meta name="generator" content="Docusaurus v3.10.1` |
| Deep doc | <https://dashsylvereye.observatoriogeo.mx/docs/overview/> | 200 |
| Static asset | <https://dashsylvereye.observatoriogeo.mx/img/logo-logo-border.png> | 200 |

The non-slash `/docs/overview` form returns 301 to the trailing-slash canonical — expected.

## Workflow run

First deploy (auto-triggered by the PR #2 merge to `main`):
<https://github.com/observatoriogeo/dash-sylvereye/actions/runs/26372252040>

- build: 1m10s ✓
- deploy: 10s ✓

## GitHub Pages state (post-cutover)

```
build_type:    workflow
cname:         dashsylvereye.observatoriogeo.mx
https_enforced: true
https_certificate.state: approved (expires 2026-08-22)
source:        branch=main, path=/
```

## Manual step still pending — Albatross teardown

Albatross deployment of these docs was **intentionally left running** by this migration. Once you have eyeballed the new site for a day or two and are happy, tear down the Albatross variant manually:

1. The Albatross variant lives in the separate repo **`dash-sylvereye-docs-alba`** at `/home/alberto/Dropbox/alberto/IIxM/Desarrollos/dash-sylvereye/dash-sylvereye-docs-alba` — distinct from the canonical `dash-sylvereye-docs` that was migrated here.
2. Stop the Docker container on the Albatross host (Albatross Hub at `root@173.255.205.89` — see the `[[Albatross Hub]]` note in the IIxM vault for SSH details and the `docker stack ls` entries to remove).
3. Confirm the DNS CNAME `dashsylvereye.observatoriogeo.mx -> observatoriogeo.github.io` is still in place — it should be, since the new deploy depends on it.
4. (Optional) Archive `dash-sylvereye-docs-alba` on GitHub if you no longer want to maintain the Docker-based variant.

The original source repo `albertogarob/dash-sylvereye-docs` was used as the migration source and is now superseded — consider archiving it as well, or pointing its README at this repo's `website/` subtree.

## Things to know going forward

- The skill at `.claude/skills/docs-deploy/SKILL.md` is the single source of truth for "how to ship a docs change." It documents the deploy loop, a sync-check entry point ("is everything synced?"), and seven failure modes that have bitten the equivalent Whistlerlib pipeline.
- `website/package-lock.json` **must stay tracked** — the workflow's `setup-node` step caches against it. The root `.gitignore` does not currently exclude `package-lock.json` (only Python build artifacts), so no negation rule is needed today. If anyone adds a project-wide `package-lock.json` ignore, the workflow will break with a `Some specified paths were not resolved` error — see Failure mode #1 in the skill.
- The `docs-deploy.yml` workflow uses Node 20 actions (`actions/checkout@v4`, `setup-node@v4`, `upload-artifact@v4`). GitHub deprecated Node 20 actions on 2025-09-19; they'll be force-migrated to Node 24 on 2026-06-02 and Node 20 is removed on 2026-09-16. Whistlerlib's workflow has the same exposure — fix in both repos together when the time comes.
- The branch `docs/migrate-to-github-pages` was deleted on merge (`gh pr merge --delete-branch`). Nothing to clean up.

## Pre-existing dirty state not touched by this run

Working tree had two pre-existing modifications I deliberately left alone:

- `.gitignore` — adds `.secrets` (one line, pre-existing).
- `lancedb/` — untracked directory, pre-existing.

Neither is mine. Review and commit them yourself if appropriate.
