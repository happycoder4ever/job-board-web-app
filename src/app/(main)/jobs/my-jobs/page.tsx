import { requireRole } from "@/lib/require-role";

export default async function MyJobsPage() {
  const session = await requireRole("EMPLOYER");

  return (
    <div>
      <h1>Jobs List for {session.user.name}</h1>
    </div>
  );
}
