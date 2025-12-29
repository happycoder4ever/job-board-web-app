import { requireRole } from "@/lib/require-role";

export default async function PostJobPage() {
  const session = await requireRole("EMPLOYER");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Post a New Job, {session.user.name}
      </h1>
      <p className="mt-2 text-gray-600">
        Fill in the details below to post a new job listing.
      </p>
      {/* Placeholder for job form */}
    </div>
  );
}
