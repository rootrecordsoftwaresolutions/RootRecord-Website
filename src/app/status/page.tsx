import { redirect } from "next/navigation";

export default function LegacyStatusRedirect() {
  redirect("/home/status");
}
