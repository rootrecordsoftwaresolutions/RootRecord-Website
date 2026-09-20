export default function ServiceCard({service}) {
  return (
    <div style={{
      padding:"20px",
      border:"1px solid #333",
      borderRadius:"12px"
    }}>
      <h3>{service.name}</h3>
      <p>Status: {service.status}</p>
      <p>{service.description}</p>
    </div>
  );
}
