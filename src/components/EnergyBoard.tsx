"use client";

import { useEffect, useState } from "react";
import styles from "@/app/home/status/page.module.css";

/** AWS Network Globe — only AWS hook on this page (visual background). */
const DEFAULT_GLOBE = "https://www.rootrecord.cloud";

type EnergySnapshot = {
  status: "No data" | "Waiting" | "live";
  solarInW: string;
  deltaSoc: string;
  riverSoc: string;
  acOut: string;
  buckets: string;
  source: string;
  updated: string | null;
};

const EMPTY: EnergySnapshot = {
  status: "Waiting",
  solarInW: "No data",
  deltaSoc: "No data",
  riverSoc: "No data",
  acOut: "Waiting",
  buckets: "Waiting",
  source: "/home/rootrecord/Database/ENERGY", // soc/*-last, watts/*-last, samples/read-*
  updated: null,
};

export default function EnergyBoard() {
  const [snap, setSnap] = useState<EnergySnapshot>(EMPTY);
  const globeUrl =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GLOBE_URL) ||
    DEFAULT_GLOBE;

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try {
        const res = await fetch("/api/energy", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<EnergySnapshot>;
        if (!stop) {
          setSnap({
            ...EMPTY,
            ...data,
            // Never invent numbers — coerce missing to No data / Waiting
            solarInW: data.solarInW ?? "No data",
            deltaSoc: data.deltaSoc ?? "No data",
            riverSoc: data.riverSoc ?? "No data",
            acOut: data.acOut ?? "Waiting",
            buckets: data.buckets ?? "Waiting",
            status: data.status ?? "Waiting",
            source: data.source ?? EMPTY.source,
            updated: data.updated ?? null,
          });
        }
      } catch {
        /* stay on last honest snapshot */
      }
    };
    void tick();
    const iv = setInterval(() => void tick(), 60_000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, []);

  return (
    <section className={styles.page} aria-label="Energy board">
      <iframe
        className={styles.globeFrame}
        src={globeUrl}
        title="Network Globe background"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
      />
      <div className={styles.veil} aria-hidden />
      <div className={styles.overlay}>
        <div className={styles.kicker}>
          <span className="pill pill-muted">{snap.status === "live" ? "Live" : "No data"}</span>
          <span className="pill pill-amber">
            {snap.status === "live" ? "Desk" : "Waiting"}
          </span>
          <span className="pill pill-muted">Hawaiʻi direct</span>
        </div>
        <h1 className={styles.title}>Energy</h1>
        <p className={styles.lead}>
          Off-grid board for Fern Forest. Watts and SOC come from measured
          Hawaii samples only. The Network Globe behind this overlay is the
          sole AWS hook; energy metrics do not route through the mainland.
        </p>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>Solar in</h2>
            <p className={styles.mono}>{snap.solarInW}</p>
          </article>
          <article className={styles.card}>
            <h2>Delta SOC</h2>
            <p className={styles.mono}>{snap.deltaSoc}</p>
          </article>
          <article className={styles.card}>
            <h2>River SOC</h2>
            <p className={styles.mono}>{snap.riverSoc}</p>
          </article>
          <article className={styles.card}>
            <h2>AC out</h2>
            <p className={styles.mono}>{snap.acOut}</p>
          </article>
          <article className={styles.card}>
            <h2>Buckets</h2>
            <p className={styles.mono}>{snap.buckets}</p>
            <p className={styles.note}>1m · 5m · 15m · 30m · hour · daily</p>
          </article>
          <article className={styles.card}>
            <h2>Ports</h2>
            <p className={styles.mono}>Waiting</p>
            <p className={styles.note}>Per-port scripts land with desk energy skill</p>
          </article>
        </div>
        <div className={styles.metaRow}>
          <span>
            Source <code>{snap.source}</code>
          </span>
          <span>Updated {snap.updated ?? "—"}</span>
        </div>
        <p className={styles.globeHint}>
          Background: {globeUrl} (AWS Network Globe). Overlay cites{" "}
          <code>Database/ENERGY</code> or shows No data — never invented watts.
        </p>
      </div>
    </section>
  );
}
