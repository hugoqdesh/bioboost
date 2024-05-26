import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminComponent from "@/components/AdminComponent";

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
    return null;
  }

  if (user.role !== "admin") {
    return (
      <section className="mx-auto my-10 ">
        <p className="text-center text-red-500 font-bold text-2xl">
          You do not have access to this page.
        </p>
      </section>
    );
  }

  return <AdminComponent />;
}
