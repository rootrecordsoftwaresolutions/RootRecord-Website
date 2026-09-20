export default function StatusPage() {
  return (
    <main style={{padding:"40px",fontFamily:"system-ui"}}>
      <h1>System Status</h1>

      <p>
        RootRecord public interface is online.
      </p>

      <section>
        <h2>Services</h2>
        <ul>
          <li>Public Interface: Online</li>
          <li>Data Services: Initializing</li>
          <li>Network Services: Initializing</li>
        </ul>
      </section>
    </main>
  );
}
