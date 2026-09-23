# ==============================================================================
# STATUS / ENERGY BOARD — foundation (Vercel)
# Owner path: skills/website/site
# ==============================================================================

## Visitor paths

| Path | Role |
|------|------|
| `/home` | Core landing |
| `/home/status` | Only status/energy board |
| `/` | Redirect → `/home` |

## Data path (Hawaii direct)

1. Desk FS: `Database/ENERGY/*-last.json`
2. Hosted: `GET https://rootserver.rootrecord.cloud/energy` (poller) ← `ENERGY_FEED_URL`
3. Vercel `/api/energy` tries FS then feed. Never invent. Never `master-key.env`.

## Seal

Visitor polish: Carly re-seal when hosted feed is verified. Ports honesty: low-SOC smoke ≠ green toggles.
