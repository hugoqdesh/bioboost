import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if (user.role !== "admin") {
    return (
      <section className="mx-auto my-10">
        <p className="text-center">You do not have access to this page.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto my-10 space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">welcome, admin!</p>
    </section>
  );
}
