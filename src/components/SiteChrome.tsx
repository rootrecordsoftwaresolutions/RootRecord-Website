import styles from "@/app/page.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/status", label: "Status" },
];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">
            <span className={styles.logoMark} aria-hidden>
              ◈
            </span>
            Root Record
          </a>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Root Record Software Solutions</p>
        <p className={styles.footerSub}>Powered by the sun · Fern Forest, Hawaiʻi</p>
      </footer>
    </div>
  );
}
