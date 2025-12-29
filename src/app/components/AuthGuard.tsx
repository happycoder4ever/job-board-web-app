import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // shared NextAuth config

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // If logged in, redirect by role immediately
  if (session) {
    if (session.user.role === "EMPLOYER") {
      redirect("/jobs/post");
    } else {
      redirect("/jobs/");
    }
  }

  // Not logged in → render the auth form
  return <>{children}</>;
}
