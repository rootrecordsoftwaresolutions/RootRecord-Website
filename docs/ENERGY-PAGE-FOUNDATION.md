# ==============================================================================
# STATUS / ENERGY BOARD — foundation (Vercel)
# Owner path: skills/website/site
# ==============================================================================

## SECTION: Visitor paths

| Path | Role |
|------|------|
| `/home` | Core landing |
| `/home/status` | **Only** status/energy board |
| `/` | Redirect → `/home` |
| `/status`, `/energy` | Redirect → `/home/status` |

## SECTION: Status board (`EnergyBoard.tsx`)

- Background: `https://www.rootrecord.cloud` (`NEXT_PUBLIC_GLOBE_URL`) — iframe only.
- Overlay: Solar in · Delta SOC · River SOC · AC out · Buckets · Ports (AC/USB-C).
- Fetch: `GET /api/energy` every 60s.

## SECTION: Desk contract (Bruce)

Root: `ENERGY_ROOT` || `/home/rootrecord/Database/ENERGY`

| Kind | Files |
|------|--------|
| SOC | `soc/delta2-last.json`, `soc/river2pro-last.json` |
| Watts | `watts/delta2-last.json`, `watts/river2pro-last.json` |
| Samples | `samples/read-*.json` (archive; board uses `*-last.json`) |

Missing file → **No data** / **Waiting**. Never invent watts or SOC.

## SECTION: Deploy note

Desk/local Next can read the OmniBook ENERGY tree. Hosted Vercel has no desk FS — publish measured `*-last.json` (or set `ENERGY_ROOT` on a Hawaii-reachable runtime) before visitor cutover. AWS lander untouched until then.

## SECTION: Seal

Visitor polish: Carly Mal re-seal after measured samples (in progress once Delta files exist).
