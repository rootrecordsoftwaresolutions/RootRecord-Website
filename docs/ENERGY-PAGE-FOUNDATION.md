# Energy page foundation (Vercel)

- Route: `/energy` on RootRecord Website (Next.js under `skills/website/site`).
- Background: AWS Network Globe at `https://www.rootrecord.cloud` (override with `NEXT_PUBLIC_GLOBE_URL`). **Only AWS hook** on this page.
- Overlay: status-style cards (Solar in, Delta/River SOC, AC out, Buckets, Ports).
- Data: Hawaii → `/api/energy` → cards. Truth tree on desk: `/home/rootrecord/Database/ENERGY`. Until samples exist: **No data** / **Waiting**. Never invent watts.
- Mainland bypass: energy metrics are not ingested via US-MAINLAND; globe is visual only.
- Desk owner for BLE/scripts: Bruce Monitor (`skills/energy`). Public seal: Carly Mal before visitor-facing polish.
- Bak: `Database/GITHUB/website-site.bak-energy-foundation-*`
