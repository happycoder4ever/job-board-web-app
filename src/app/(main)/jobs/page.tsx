import { prisma } from "@/lib/prisma";
import { JobList } from "@/app/components/JobList";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { employer: { select: { name: true } } },
  });

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">Job Listings</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
