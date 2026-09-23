import { redirect } from "next/navigation";

export default function LegacyEnergyRedirect() {
  redirect("/home/status");
}
