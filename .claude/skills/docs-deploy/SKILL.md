---
name: docs-deploy
description: Update and deploy the Dash Sylvereye docs site at https://dashsylvereye.observatoriogeo.mx via the GitHub Pages workflow (.github/workflows/docs-deploy.yml). Use whenever the user wants to deploy, redeploy, ship, push, publish, or update the docs site to production / Pages / live, AND whenever the user wants to check whether the deploy is in sync ("is everything synced?", "did my docs changes ship?", "is local in sync with the published site?", "is the docs site up to date with main?"). Triggers on deploy phrases like "deploy the docs", "redeploy", "publish the website", "ship the docs", "update the live site", any mention of dashsylvereye.observatoriogeo.mx; AND on sync-check phrases like "is everything synced", "verify the deploy", "did my changes ship".
---

# Docs deploy workflow (Dash Sylvereye)

End-to-end loop for publishing the Dash Sylvereye documentation site to GitHub Pages on the vanity domain `https://dashsylvereye.observatoriogeo.mx`. The deploy is a single GitHub Actions workflow; there is no SSH, no Jinja2 templating, no reverse-proxy chain. Pushes to `main` that touch `website/**` (or the workflow file itself) build and publish; nothing else triggers a deploy.

## Fixed parameters for this project

These do not change across deploys. If the user asks to deploy somewhere else, stop and ask, do not silently swap a value.

| Param | Value | Where |
|---|---|---|
| Repo (SSH) | `git@github.com:observatoriogeo/dash-sylvereye.git` | |
| Default branch | `main` | |
| Workflow | `.github/workflows/docs-deploy.yml` (jobs: `build`, `deploy`) | |
| Build path | `website/` | |
| Build cmd | `cd website && npm ci && npm run build` | |
| Lock file (must be tracked) | `website/package-lock.json` | |
| Node version | 20 (pinned by `actions/setup-node@v4`) | workflow |
| Custom domain | `dashsylvereye.observatoriogeo.mx` | `website/static/CNAME` |
| DNS record | `CNAME dashsylvereye.observatoriogeo.mx. -> observatoriogeo.github.io.` | observatoriogeo.mx zone (out of repo scope) |
| Pages config | `build_type: workflow`, `cname: dashsylvereye.observatoriogeo.mx`, `https_enforced: true` | repo Settings → Pages |
| Workflow trigger paths | `website/**`, `.github/workflows/docs-deploy.yml` | workflow `on.push.paths` |

## Architecture (so you can debug when something does not deploy)

```
git push main
     │  (only if paths under website/** or the workflow file changed)
     ▼
.github/workflows/docs-deploy.yml
     ├─ build:  actions/checkout → setup-node@20 (cache: website/package-lock.json)
     │          → npm ci (in website/) → npm run build → upload-pages-artifact
     └─ deploy: actions/deploy-pages → Pages serves at dashsylvereye.observatoriogeo.mx
```

Total time end-to-end is around one minute (typical: ~55 s build, ~8 s deploy). The two jobs run sequentially; the deploy job depends on the build artifact. No SSH layer, no proxy chain, no manual steps after push.

## Content model

All docs are hand-written Markdown files under `website/docs/`. There is no sync script, no derived-from-examples chain — what is in `website/docs/<name>.md` is what gets published. Frontmatter `id:` is the canonical identifier; the navbar and footer reference docs by id (e.g. `demo_visualization` resolves to `demo.md` because that file's frontmatter sets `id: demo_visualization`).

Static assets live in `website/static/`. The custom domain pin is `website/static/CNAME` (single line: `dashsylvereye.observatoriogeo.mx`). Page assets like the logo are referenced by URL path `/img/<name>.png` — Docusaurus resolves these against `baseUrl` at build time, so the `baseUrl: '/'` in `docusaurus.config.js` is load-bearing for the custom-domain deploy.

## Phases (the deploy loop)

Four phases for an active deploy. Phase 5 is a standalone sync check (no deploy in progress).

### 1. Local build verification

```bash
cd website && npm run build
```

`onBrokenLinks: 'warn'` is set, so link rot does not fail the build — scan the build output for `[WARNING]` lines and fix link issues before push if they appear. If the build fails outright, do not push; the workflow will reproduce the same failure.

Common build-breakers:

- HTML comments `<!-- -->` in `.md` / `.mdx` files: MDX 3 strict parsing fails on these. Use `{/* ... */}` instead.
- A navbar / footer / sidebar entry pointing at a doc id (or `to:` path) that no longer exists — Docusaurus throws with `Docs version "current" has no doc named "..."`.
- Trailing-slash drift on directory-index doc links — keep all internal `to:` props consistent with how the doc files are organized (this project uses flat `.md` files, no directory-index pages, so the rule is "no trailing slash on `to:` props for plain `.md` docs").

### 2. Commit and push

```bash
git add <paths>
git status
git commit -m "<one-line summary>"
git push origin main
```

Before committing, confirm `website/package-lock.json` is in the diff if `package.json` changed. Pushing is visible to others and triggers the live deploy, so confirm with the user unless they have already said "deploy".

If the changes touch only paths outside `website/**` (for example `dash_sylvereye/`, `src/lib/`, `tests/`, or examples/), the push will NOT trigger a deploy. To force a redeploy with no content change:

```bash
gh workflow run docs-deploy.yml --ref main
```

### 3. Watch the workflow

```bash
RUN_ID=$(gh run list --workflow=docs-deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN_ID" --exit-status
```

Typical timing: ~55 s build, ~8 s deploy. If the build step fails, view the logs with `gh run view "$RUN_ID" --log-failed`.

### 4. Verify live

Three-line smoke test against the public URL:

```bash
# Root
curl -sS -o /dev/null -w 'root:    %{http_code}\n' \
  https://dashsylvereye.observatoriogeo.mx/

# Deep doc page (catches baseUrl misconfig and broken sidebars)
curl -sS -o /dev/null -w 'deep:    %{http_code}\n' \
  https://dashsylvereye.observatoriogeo.mx/docs/overview

# Static asset (catches Docusaurus build-with-wrong-baseUrl)
curl -sS -o /dev/null -w 'asset:   %{http_code}\n' \
  https://dashsylvereye.observatoriogeo.mx/img/logo-logo-border.png
```

All three should return 200 (occasional 301 on the root is fine for the trailing-slash redirect). If any return 404 or SSL errors, jump to "Debugging unreachable deploys" below.

### 5. Verify sync (standalone)

This phase is also a **standalone entry point**: when the user asks "is everything synced?" / "did my changes ship?" / "is local in sync with the published site?", jump straight here, skip phases 1 through 4.

Four state stores must agree:

1. Local working tree (no uncommitted edits in `website/`).
2. Local `HEAD`.
3. `origin/main` on GitHub.
4. The SHA of the latest successful workflow run.

```bash
git status --short website/             # expect: empty output
git fetch origin
LOCAL=$(git rev-parse HEAD)
ORIGIN=$(git rev-parse origin/main)
LATEST_RUN=$(gh run list --workflow=docs-deploy.yml --status=success --limit 1 \
              --json headSha --jq '.[0].headSha')

echo "local:    $LOCAL"
echo "origin:   $ORIGIN"
echo "deployed: $LATEST_RUN"
```

**Pass:** all three hashes match AND `git status --short website/` is empty. Report the matched short hash.

**Fail:** read the gap from the mismatch table:

| Symptom | Means | Fix |
|---|---|---|
| `git status --short website/` non-empty | Local website edits never committed | Run phase 2 |
| `local != origin` | Committed, never pushed | `git push origin main` |
| `origin != deployed` AND there is a more-recent run that failed | Build broke; the deployed version is stale | View failure with `gh run view <id> --log-failed`, fix, re-push |
| `origin != deployed` AND no recent run exists | Path filter missed: the push touched only non-`website/**` paths | Trigger `gh workflow run docs-deploy.yml --ref main`, or mirror into `website/` |

## Failure modes worth knowing about

### 1. Lock file untracked

**Symptom:** `actions/setup-node@v4` fails with `Some specified paths were not resolved, unable to cache dependencies`. Deploy job is skipped.

**Cause:** `website/package-lock.json` was never committed, or was inadvertently `.gitignore`d.

**Fix:**

```bash
# Confirm the lock file is tracked
git ls-files website/package-lock.json

# If empty, ensure it is not ignored and re-add
git check-ignore -v website/package-lock.json   # should report nothing
git add website/package-lock.json
```

### 2. CNAME drift

**Symptom:** `gh api repos/observatoriogeo/dash-sylvereye/pages --jq .cname` returns null or a wrong host. HTTPS cert provisioning fails or the custom domain stops resolving.

**Cause:** `website/static/CNAME` is missing, contains a different host, or has stray whitespace.

**Fix:**

```bash
printf 'dashsylvereye.observatoriogeo.mx\n' > website/static/CNAME
git add website/static/CNAME && git commit -m "Restore Pages CNAME"
# After deploy:
gh api -X PUT repos/observatoriogeo/dash-sylvereye/pages \
  --field cname=dashsylvereye.observatoriogeo.mx \
  --field https_enforced=true
```

### 3. HTML comments in hand-written docs

**Symptom:** local `npm run build` fails with an MDX acorn parse error around a `<!--` token in a `.md` file under `website/docs/`.

**Cause:** the website's strict-mode MDX 3 parser refuses HTML comments in `.md` files.

**Fix:** swap any `<!-- ... -->` to `{/* ... */}` in the offending doc.

### 4. Broken doc id reference

**Symptom:** build fails with `Docs version "current" has no doc named "<id>"`, or a navbar item links to a 404 after deploy.

**Cause:** a navbar / footer item in `docusaurus.config.js` references a `docId:` that does not match any frontmatter `id:` in `website/docs/`. Or, the `id:` in a doc's frontmatter changed without updating the references.

**Fix:** `grep -l "^id: <missing-id>" website/docs/` to find the doc; rename the reference or restore the id.

### 5. Path-filter miss

**Symptom:** `gh run list --workflow=docs-deploy.yml --limit 1` shows no new run after a push to `main`.

**Cause:** the push touched only files outside `website/**` and outside `.github/workflows/docs-deploy.yml`. Pure-Python / pure-JS edits to the `dash_sylvereye/` package do not trigger a docs deploy.

**Fix:**

```bash
gh workflow run docs-deploy.yml --ref main
```

### 6. Pages source drift

**Symptom:** the workflow's `deploy` job fails with a permissions or "Pages not configured" error.

**Cause:** someone toggled repo Settings → Pages → Source from "GitHub Actions" to "Deploy from a branch", or disabled Pages entirely.

**Fix:** check the API.

```bash
gh api repos/observatoriogeo/dash-sylvereye/pages --jq .build_type
# expect: "workflow"
```

If different, set it manually in repo Settings → Pages → "Build and deployment / Source: GitHub Actions" (the Source field is not settable via the public API).

### 7. `https_enforced` got flipped off

**Symptom:** `http://dashsylvereye.observatoriogeo.mx/` returns 200 instead of a redirect to HTTPS; the Pages API shows `https_enforced: false`.

**Cause:** explicitly toggled off in repo Settings, or auto-reset after a CNAME change via the API.

**Fix:**

```bash
gh api -X PUT repos/observatoriogeo/dash-sylvereye/pages \
  --field https_enforced=true
```

## Debugging unreachable deploys

When live curl returns 4xx / 5xx, walk the chain from outside in.

```bash
# 1. Is the workflow even running?
gh run list --workflow=docs-deploy.yml --limit 3

# 2. Did the latest run succeed?
gh run view <run_id> --json status,conclusion,jobs

# 3. Pages config state
gh api repos/observatoriogeo/dash-sylvereye/pages | python3 -m json.tool

# 4. DNS still resolves correctly?
dig +short dashsylvereye.observatoriogeo.mx
# Expected:
#   observatoriogeo.github.io.
#   185.199.108.153
#   185.199.109.153
#   185.199.110.153
#   185.199.111.153

# 5. HTTPS cert state
gh api repos/observatoriogeo/dash-sylvereye/pages --jq .https_certificate
# Expect: {"state": "approved", ...}

# 6. Direct curl with -v if the SSL handshake is failing
curl -vsS -o /dev/null https://dashsylvereye.observatoriogeo.mx/ 2>&1 | head -30
```

Stop and report at the first mismatch; do not redeploy blindly.

## Albatross teardown (one-time, not yet executed)

This site was migrated from Albatross Hub to GitHub Pages. The Albatross deployment is **not** torn down by this skill — see `STAGE2_HANDOFF.md` (initial migration record) for the manual teardown steps. The Albatross variant lives in a separate repo (`dash-sylvereye-docs-alba`) and a separate container on the Albatross host; GitHub Pages does not interact with either.

## Out of scope for this skill

- **Initial GH Pages enablement.** Already done as part of the Stage 2 migration. If somehow disabled, restore via repo Settings → Pages → Source: GitHub Actions.
- **DNS record provisioning.** The CNAME `dashsylvereye.observatoriogeo.mx -> observatoriogeo.github.io` is configured at the `observatoriogeo.mx` registrar; not changeable from this repo.
- **Cert revocation / renewal.** GitHub auto-manages Let's Encrypt for the custom domain; no manual cert work is needed.
- **Albatross teardown.** Out of scope by design — see the section above. Performed manually once the GitHub Pages deploy is confirmed stable.
- **PyPI release of `dash_sylvereye`.** Separate workflow; this skill is docs-only.
