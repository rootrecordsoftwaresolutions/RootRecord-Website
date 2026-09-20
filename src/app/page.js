import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{
        padding:"60px 40px",
        maxWidth:"900px"
      }}>

        <h1>
          RootRecord
        </h1>

        <p style={{
          fontSize:"20px",
          color:"#aaa"
        }}>
          Independent systems. Connected intelligence. Persistent services.
        </p>


        <section style={{
          marginTop:"50px",
          display:"grid",
          gap:"20px"
        }}>
          {services.map(service => (
            <ServiceCard
              key={service.name}
              service={service}
            />
          ))}
        </section>

      </main>

      <Footer />
    </>
  );
}
