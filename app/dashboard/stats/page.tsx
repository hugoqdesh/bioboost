import { auth } from "@/auth";
import Nav from "@/components/dashboard/Nav";
import { redirect } from "next/navigation";

export default async function StatsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/settings");
  }

  return (
    <section>
      <div>
        <Nav></Nav>
      </div>
      <div className="flex justify-center h-96 mt-40">
        <h1 className="text-3xl">Nothing to see here yet</h1>
      </div>
    </section>
  );
}
