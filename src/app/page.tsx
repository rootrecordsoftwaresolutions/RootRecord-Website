import { redirect } from "next/navigation";

/** Core landing lives at /home. Root redirects for Vercel staging. */
export default function RootPage() {
  redirect("/home");
}
