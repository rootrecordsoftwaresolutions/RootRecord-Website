/**
 * ==============================================================================
 * GET /api/energy — measured ENERGY (jobs.py-clean)
 * ------------------------------------------------------------------------------
 * Owner: skills/website/site/src/app/api/energy/route.ts
 * 1) Desk FS: ENERGY_ROOT || /home/rootrecord/Database/ENERGY (*-last.json)
 * 2) Else Hawaii feed: ENERGY_FEED_URL || https://rootserver.rootrecord.cloud/energy
 * Rule: missing → No data / Waiting. Never invent. Never read master-key.env.
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
const ENERGY_FEED_URL =
  process.env.ENERGY_FEED_URL ||
  "https://rootserver.rootrecord.cloud/energy";

type SocFile = { soc?: number; at?: string };
type WattsFile = {
  solar_input_power?: number;
  ac_output_power?: number;
  ac_input_power?: number;
  usbc_output_power?: number;
  at?: string;
};

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

function snapshotFromFiles(
  deltaSoc: SocFile | null,
  riverSoc: SocFile | null,
  deltaW: WattsFile | null,
  riverW: WattsFile | null,
  source: string,
) {
  const hasDelta = Boolean(deltaSoc || deltaW);
  const hasRiver = Boolean(riverSoc || riverW);
  const live = hasDelta || hasRiver;

  const solarInW = hasDelta
    ? fmtW(deltaW?.solar_input_power)
    : hasRiver
      ? fmtW(riverW?.solar_input_power)
      : "No data";

  const acOut = hasDelta
    ? fmtW(deltaW?.ac_output_power)
    : hasRiver && typeof riverW?.ac_output_power === "number"
      ? fmtW(riverW.ac_output_power)
      : "Waiting";

  const usbC = hasDelta
    ? fmtW(deltaW?.usbc_output_power)
    : hasRiver
      ? fmtW(riverW?.usbc_output_power)
      : "No data";

  return {
    status: live ? ("live" as const) : ("Waiting" as const),
    solarInW,
    deltaSoc: hasDelta ? fmtSoc(deltaSoc?.soc) : "No data",
    riverSoc: hasRiver ? fmtSoc(riverSoc?.soc) : "Waiting",
    acOut,
    usbC,
    buckets: "Waiting",
    ports: { ac: acOut, usbc: usbC },
    source,
    files: {
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
      ? "Measured samples. Missing device files stay No data / Waiting."
      : "No *-last.json under ENERGY yet.",
  };
}

export async function GET() {
  const deltaSoc = await readJson<SocFile>("soc/delta2-last.json");
  const riverSoc = await readJson<SocFile>("soc/river2pro-last.json");
  const deltaW = await readJson<WattsFile>("watts/delta2-last.json");
  const riverW = await readJson<WattsFile>("watts/river2pro-last.json");

  if (deltaSoc || riverSoc || deltaW || riverW) {
    return NextResponse.json(
      snapshotFromFiles(deltaSoc, riverSoc, deltaW, riverW, ENERGY_ROOT),
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  // Hosted Vercel: no desk FS — pull Hawaii feed (tunnel), never invent
  try {
    const res = await fetch(ENERGY_FEED_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const body = await res.json();
      return NextResponse.json(
        { ...body, feed: ENERGY_FEED_URL },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  } catch {
    /* fall through */
  }

  return NextResponse.json(
    snapshotFromFiles(null, null, null, null, ENERGY_ROOT),
    { headers: { "Cache-Control": "no-store" } },
  );
}
