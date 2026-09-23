/**
 * ==============================================================================
 * GET /api/energy — Hawaii → Vercel snapshot stub (jobs.py-clean)
 * ------------------------------------------------------------------------------
 * Owner: skills/website/site/src/app/api/energy/route.ts
 * Truth: /home/rootrecord/Database/ENERGY
 *   soc/{delta2|river2pro}-last.json
 *   watts/*-last.json
 *   samples/read-*.json
 * Rule: empty/missing → No data / Waiting. Never invent watts/SOC.
 * Plug: when Bruce publishes measured files, map them here (Hawaii direct).
 * ==============================================================================
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ------------------------------------------------------------------------------
// SECTION: Contract (paths only — no live reads on Vercel yet)
// ------------------------------------------------------------------------------
const CONTRACT = {
  root: "/home/rootrecord/Database/ENERGY",
  soc: ["soc/delta2-last.json", "soc/river2pro-last.json"],
  watts: "watts/*-last.json",
  samples: "samples/read-*.json",
} as const;

// ------------------------------------------------------------------------------
// SECTION: Handler
// ------------------------------------------------------------------------------
export async function GET() {
  return NextResponse.json(
    {
      status: "Waiting",
      solarInW: "No data",
      deltaSoc: "No data",
      riverSoc: "No data",
      acOut: "Waiting",
      buckets: "Waiting",
      source: CONTRACT.root,
      contract: CONTRACT,
      files: {
        delta2Soc: `${CONTRACT.root}/soc/delta2-last.json`,
        river2proSoc: `${CONTRACT.root}/soc/river2pro-last.json`,
        wattsLast: `${CONTRACT.root}/watts/*-last.json`,
        samplesRead: `${CONTRACT.root}/samples/read-*.json`,
      },
      updated: null,
      note:
        "Stub. Empty tree or missing file = No data / Waiting. Plug when measured snapshots appear.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
