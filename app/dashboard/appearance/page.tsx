import { auth } from "@/auth";
import Nav from "@/components/Nav";
import CustomizeProfile from "@/components/dashboard/CustomizeProfile";
import { redirect } from "next/navigation";

export default async function AppearancePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/settings");
  }

  return (
    <section>
      <Nav />
      <CustomizeProfile />
    </section>
  );
}
