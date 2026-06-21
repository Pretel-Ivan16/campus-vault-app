import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session){
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Bienvenido {session.user.name}
      </p>

      <SignOutButton />
    </main>
  )
}