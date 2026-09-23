import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.kicker}>
          <span className="pill pill-amber">Foundation</span>
          <span className="pill pill-cyan">Vercel</span>
        </div>
        <h1 className={styles.title}>Root Record</h1>
        <p className={styles.lead}>
          Public interface for Root Record systems — off-grid ops, live status,
          and software from Fern Forest on the Big Island of Hawaiʻi.
        </p>
        <p className={styles.mono}>Rebuild in progress · foundation only</p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Status</h2>
          <p>
            Desk metrics stay honest: <strong>No data</strong> /{" "}
            <strong>Waiting</strong> until a live source is wired.{" "}
            <a href="/status">Open status →</a>
          </p>
        </article>
        <article className={styles.card}>
          <h2>Deploy</h2>
          <p>
            This app is the RootRecord-Website Vercel surface. No secrets in the
            repo. APIs added deliberately later.
          </p>
        </article>
        <article className={styles.card}>
          <h2>Desk</h2>
          <p>
            OmniBook skill path: <code>~/.ollama/skills/website/site</code>
          </p>
        </article>
      </section>
    </>
  );
}
