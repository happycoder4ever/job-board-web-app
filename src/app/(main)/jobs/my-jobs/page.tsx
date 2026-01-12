import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { JobList } from "@/app/components/JobList";

export default async function MyJobsPage() {
  const session = await requireRole("EMPLOYER");

  const jobs = await prisma.job.findMany({
    where: { employerId: session.user.id },
    include: { employer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center mb-6">My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">You have not posted any jobs yet.</p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
}
