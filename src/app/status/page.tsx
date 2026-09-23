import styles from "../page.module.css";

export const metadata = {
  title: "Status — Root Record",
};

export default function StatusPage() {
  return (
    <section className={styles.hero}>
      <div className={styles.kicker}>
        <span className="pill pill-muted">No data</span>
        <span className="pill pill-amber">Waiting</span>
      </div>
      <h1 className={styles.title}>Live status</h1>
      <p className={styles.lead}>
        Foundation stub. Solar, host, EcoFlow, Starlink, and council feeds are
        not connected here yet. Values are not invented.
      </p>
      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Solar</h2>
          <p className={styles.mono}>No data</p>
        </article>
        <article className={styles.card}>
          <h2>Host</h2>
          <p className={styles.mono}>No data</p>
        </article>
        <article className={styles.card}>
          <h2>EcoFlow</h2>
          <p className={styles.mono}>Waiting</p>
        </article>
        <article className={styles.card}>
          <h2>Public edge</h2>
          <p className={styles.mono}>Waiting</p>
        </article>
      </div>
    </section>
  );
}
