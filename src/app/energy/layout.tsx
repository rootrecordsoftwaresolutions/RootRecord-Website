import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy — Root Record",
  description:
    "Hawaii off-grid energy board. Measured samples only; No data when the desk has not published.",
};

export default function EnergyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
