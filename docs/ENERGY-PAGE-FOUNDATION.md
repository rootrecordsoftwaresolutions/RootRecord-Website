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
- Overlay cards: Solar in · Delta SOC · River SOC · AC out · Buckets · Ports.
- Fetch: `GET /api/energy` every 60s. Missing → No data / Waiting.

## SECTION: Desk contract (Bruce)

Root: `/home/rootrecord/Database/ENERGY`

| Kind | Files |
|------|--------|
| SOC | `soc/delta2-last.json`, `soc/river2pro-last.json` |
| Watts | `watts/*-last.json` |
| Samples | `samples/read-*.json` |

## SECTION: Seal

Visitor polish held until measured files exist + Carly Mal re-seal.
Thin power: do not stack publish/deploy on the BLE cut.
