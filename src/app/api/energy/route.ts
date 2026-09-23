import { NextResponse } from "next/server";

/**
 * Hawaii → Vercel energy snapshot.
 * Desk (Bruce / skills/energy) will publish measured samples from
 * /home/rootrecord/Database/ENERGY. Until that feed is wired, return
 * honest placeholders only — never invent watts or SOC.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    {
      status: "Waiting",
      solarInW: "No data",
      deltaSoc: "No data",
      riverSoc: "No data",
      acOut: "Waiting",
      buckets: "Waiting",
      source: "/home/rootrecord/Database/ENERGY",
      updated: null,
      note: "Foundation stub. Publish measured samples from Hawaii; do not invent values.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
