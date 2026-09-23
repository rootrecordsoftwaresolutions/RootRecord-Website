import { NextResponse } from "next/server";

/**
 * Hawaii → Vercel energy snapshot.
 *
 * Desk contract (Bruce Monitor / skills/energy) — measured files only:
 *   Database/ENERGY/soc/{delta2|river2pro}-last.json
 *   Database/ENERGY/watts/…-last.json
 *   Database/ENERGY/samples/read-…json
 *
 * Empty tree or missing file → No data / Waiting. Never invent watts or SOC.
 * This route stays a stub until Hawaii publishes those snapshots here.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const CONTRACT = {
  root: "/home/rootrecord/Database/ENERGY",
  soc: [
    "soc/delta2-last.json",
    "soc/river2pro-last.json",
  ],
  watts: "watts/*-last.json",
  samples: "samples/read-*.json",
} as const;

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
        "Foundation stub. Empty tree or missing file = No data / Waiting. Plug when measured snapshots appear.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
