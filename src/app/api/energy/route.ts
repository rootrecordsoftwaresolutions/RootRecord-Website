/**
 * ==============================================================================
 * GET /api/energy — read measured ENERGY last-files (jobs.py-clean)
 * ------------------------------------------------------------------------------
 * Owner: skills/website/site/src/app/api/energy/route.ts
 * Truth: ENERGY_ROOT || /home/rootrecord/Database/ENERGY
 *   soc/{delta2|river2pro}-last.json
 *   watts/{delta2|river2pro}-last.json
 * Rule: missing file → No data / Waiting. Never invent watts/SOC.
 * Secrets: none — never read master-key.env from this route.
 * Note: Vercel edge has no desk FS; set ENERGY_ROOT or publish copies for prod.
 * ==============================================================================
 */

import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const ENERGY_ROOT =
  process.env.ENERGY_ROOT || "/home/rootrecord/Database/ENERGY";

type SocFile = { soc?: number; at?: string };
type WattsFile = {
  solar_input_power?: number;
  ac_output_power?: number;
  ac_input_power?: number;
  usbc_output_power?: number;
  at?: string;
};

// ------------------------------------------------------------------------------
// SECTION: Honest readers
// ------------------------------------------------------------------------------
async function readJson<T>(rel: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(ENERGY_ROOT, rel), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function fmtW(n: number | undefined): string {
  if (typeof n !== "number" || Number.isNaN(n)) return "No data";
  return `${n} W`;
}

function fmtSoc(n: number | undefined): string {
  if (typeof n !== "number" || Number.isNaN(n)) return "No data";
  return `${n}%`;
}

function latestAt(...ats: (string | undefined | null)[]): string | null {
  const ok = ats.filter((a): a is string => Boolean(a));
  if (!ok.length) return null;
  return ok.sort().at(-1) ?? null;
}

// ------------------------------------------------------------------------------
// SECTION: Handler
// ------------------------------------------------------------------------------
export async function GET() {
  const deltaSoc = await readJson<SocFile>("soc/delta2-last.json");
  const riverSoc = await readJson<SocFile>("soc/river2pro-last.json");
  const deltaW = await readJson<WattsFile>("watts/delta2-last.json");
  const riverW = await readJson<WattsFile>("watts/river2pro-last.json");

  const hasDelta = Boolean(deltaSoc || deltaW);
  const hasRiver = Boolean(riverSoc || riverW);
  const live = hasDelta || hasRiver;

  // Prefer Delta solar/AC for the board summary (desk primary bank).
  const solarInW = hasDelta
    ? fmtW(deltaW?.solar_input_power)
    : hasRiver
      ? fmtW(riverW?.solar_input_power)
      : "No data";

  const acOut = hasDelta
    ? fmtW(deltaW?.ac_output_power)
    : hasRiver
      ? fmtW(riverW?.ac_output_power)
      : "Waiting";

  const usbC = hasDelta
    ? fmtW(deltaW?.usbc_output_power)
    : hasRiver
      ? fmtW(riverW?.usbc_output_power)
      : "No data";

  const body = {
    status: live ? ("live" as const) : ("Waiting" as const),
    solarInW,
    deltaSoc: hasDelta ? fmtSoc(deltaSoc?.soc) : "No data",
    riverSoc: hasRiver ? fmtSoc(riverSoc?.soc) : "Waiting",
    acOut,
    usbC,
    buckets: "Waiting",
    ports: {
      ac: acOut,
      usbc: usbC,
    },
    source: ENERGY_ROOT,
    files: {
      delta2Soc: "soc/delta2-last.json",
      river2proSoc: "soc/river2pro-last.json",
      delta2Watts: "watts/delta2-last.json",
      river2proWatts: "watts/river2pro-last.json",
      present: {
        delta2Soc: Boolean(deltaSoc),
        river2proSoc: Boolean(riverSoc),
        delta2Watts: Boolean(deltaW),
        river2proWatts: Boolean(riverW),
      },
    },
    updated: latestAt(
      deltaSoc?.at,
      riverSoc?.at,
      deltaW?.at,
      riverW?.at,
    ),
    note: live
      ? "Measured desk samples. Missing device files stay No data / Waiting."
      : "No *-last.json under ENERGY yet.",
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "no-store" },
  });
}
