// app/(main)/jobs/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DeleteJobButton } from "@/app/components/DeleteJobButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ApplyForm from "@/app/components/ApplyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id: jobId } = await params;
  if (!jobId) notFound();

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      employer: { select: { id: true, name: true } },
      _count: { select: { applications: true } },
    },
  });

  if (!job) notFound();

  // optional session: does not block unauth users
  const session = await getServerSession(authOptions);
  const isOwner = session?.user.id === job.employerId;
  const isJobSeeker = session?.user.role === "JOB_SEEKER";

  let alreadyApplied = false;

  if (isJobSeeker && session) {
    const existing = await prisma.application.findFirst({
      where: {
        jobId: job.id,
        userId: session.user.id,
      },
    });

    alreadyApplied = !!existing;
  }

  const applicantsCount = job._count?.applications ?? 0;

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">{job.title}</h1>
      <p className="mt-2 text-center text-gray-600">{job.description}</p>
      <p className="mt-2 text-center text-gray-500">{job.location}</p>
      {/* Applications count */}
      <p className="mt-4 text-center text-gray-500">
        {isOwner
          ? `${applicantsCount} ${
              applicantsCount === 1 ? "applicant" : "applicants"
            }`
          : applicantsCount === 0
          ? "No applications yet"
          : `${applicantsCount} talents applied`}
      </p>
      {/* Owner-only actions */}
      {isOwner && (
        <div className="flex gap-4 mt-6">
          <a
            href={`/jobs/${job.id}/edit`}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Edit
          </a>

          <a
            href={`/jobs/${job.id}/applicants`}
            className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 ${
              applicantsCount === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            View Applicants
          </a>

          <DeleteJobButton jobId={job.id} />
        </div>
      )}
      {isJobSeeker && (
        <div className="mt-6">
          {alreadyApplied ? (
            <p className="text-green-700 font-medium">
              You have already applied to this job.
            </p>
          ) : (
            <a
              href={`/jobs/${job.id}/apply`}
              className="inline-block rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
            >
              Apply
            </a>
          )}
        </div>
      )}
    </div>
  );
}
