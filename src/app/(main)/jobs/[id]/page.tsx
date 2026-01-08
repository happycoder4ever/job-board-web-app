// app/(main)/jobs/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  // Resolve params (Next.js App Router async params)
  const resolvedParams = await params;
  const jobId = resolvedParams.id;

  if (!jobId) notFound();

  // Fetch job + applications count
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      employer: { select: { id: true } },
      _count: { select: { applications: true } },
    },
  });

  if (!job) notFound();

  // Get session (optional)
  const session = await getServerSession(authOptions);

  const isEmployer = session?.user?.role === "EMPLOYER";
  const isJobSeeker = session?.user?.role === "JOB_SEEKER";
  const isOwner = isEmployer && job.employerId === session?.user?.id;

  const applicationsCount = job._count.applications;

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">{job.title}</h1>
      <p className="mt-2 text-center text-gray-600">{job.description}</p>
      <p className="mt-2 text-center text-gray-500">{job.location}</p>

      {/* Employer (owner) actions */}
      {isOwner && (
        <div className="flex gap-4 mt-6">
          <a
            href={`/jobs/${job.id}/edit`}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Edit
          </a>

          <a
            href={
              applicationsCount > 0
                ? `/jobs/${job.id}/applicants`
                : undefined
            }
            className={`rounded-md border px-4 py-2 ${
              applicationsCount === 0
                ? "opacity-50 pointer-events-none"
                : "hover:bg-gray-100"
            }`}
          >
            {applicationsCount} talents applied
          </a>
        </div>
      )}

      {/* Job seeker action */}
      {isJobSeeker && !isOwner && (
        <div className="mt-6">
          <a
            href={`/jobs/${job.id}/apply`}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Apply for this job
          </a>
        </div>
      )}
    </div>
  );
}
