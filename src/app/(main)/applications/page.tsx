import { requireRole } from "@/lib/require-role";

export default async function ApplicationsPage() {
  const session = await requireRole("JOB_SEEKER");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Applications for {session.user.name}
      </h1>
      <p className="mt-2 text-gray-600">
        All your applications overview and their status.
      </p>
    </div>
  );
}
