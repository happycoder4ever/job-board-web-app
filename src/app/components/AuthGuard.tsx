"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect signed-in users away from /auth
      router.push("/"); // landing page
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // optional loader
  }

  if (status === "authenticated") {
    return null; // already redirected
  }

  return <>{children}</>;
}
