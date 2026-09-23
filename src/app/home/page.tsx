import styles from "@/app/page.module.css";

export const metadata = {
  title: "Home — Root Record",
  description:
    "Root Record core landing — off-grid systems and public interfaces from Fern Forest, Hawaiʻi.",
};

export default function HomeCorePage() {
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
        <p className={styles.mono}>Staged at /home · AWS lander untouched until cutover</p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Status</h2>
          <p>
            One board for status and energy. Desk metrics stay honest:{" "}
            <strong>No data</strong> / <strong>Waiting</strong> until measured
            samples land. <a href="/home/status">Open status →</a>
          </p>
        </article>
        <article className={styles.card}>
          <h2>Deploy</h2>
          <p>
            This app is the RootRecord-Website Vercel surface. When the site is
            complete, AWS <code>rootrecord.cloud</code> will redirect here to{" "}
            <code>/home</code>. No lander edits until then.
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
