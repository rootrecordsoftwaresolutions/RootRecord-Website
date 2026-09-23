# Status / energy page foundation (Vercel)

## Visitor paths (staged)

| Path | Role |
|------|------|
| `/home` | Core landing |
| `/home/status` | **Only** status/energy board |
| `/` | Redirect → `/home` |
| `/status`, `/energy` | Redirect → `/home/status` (legacy) |

AWS `rootrecord.cloud` lander stays untouched until cutover. When the site is 100% done, mainland owns redirect from AWS lander → `/home`.

## Status board

- Background: AWS Network Globe at `https://www.rootrecord.cloud` (`NEXT_PUBLIC_GLOBE_URL`). **Only AWS hook** (iframe).
- Overlay: Solar in, Delta/River SOC, AC out, Buckets, Ports.
- API: `/api/energy` stub until measured files exist.
- No top-level visitor `/energy`.

## Desk publish contract (Bruce Monitor)

Truth tree: `/home/rootrecord/Database/ENERGY`

| Kind | Path pattern |
|------|----------------|
| SOC | `soc/delta2-last.json`, `soc/river2pro-last.json` |
| Watts | `watts/…-last.json` |
| Samples | `samples/read-….json` |

Empty / missing → **No data** / **Waiting**. Never invent watts or SOC.

Public polish waits Carly Mal re-seal after real samples. Thin power: don’t stack publish/deploy on the BLE cut.
