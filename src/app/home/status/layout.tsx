import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status — Root Record",
  description:
    "Hawaii off-grid status and energy board. Measured samples only; No data when the desk has not published.",
};

export default function HomeStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
