import "./globals.css";

export const metadata = {
  title: "RootRecord",
  description: "RootRecord public platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
