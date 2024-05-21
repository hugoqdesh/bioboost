import Nav from "@/components/Nav";
import { auth } from "@/auth";
import Settings from "@/components/dashboard/Settings";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/settings");
  }

  return (
    <section>
      <Nav></Nav>
      <Settings></Settings>
    </section>
  );
}
