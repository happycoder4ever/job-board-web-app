// app/(main)/jobs/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DeleteJobButton } from "@/app/components/DeleteJobButton";
import { requireRole } from "@/lib/require-role";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  // Get the current logged-in user
  const session = await requireRole("EMPLOYER");

  // Resolve params from grouped route
  const resolvedParams = await params;
  const jobId = resolvedParams.id;

  if (!jobId) notFound();

  // Fetch job with employer info
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { employer: { select: { id: true } } }, // get employer id
  });

  if (!job) notFound();

  // Check ownership
  const isOwner = job.employerId === session.user.id;

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">{job.title}</h1>
      <p className="mt-2 text-center text-gray-600">{job.description}</p>
      <p className="mt-2 text-center text-gray-500">{job.location}</p>

      {isOwner && (
        <div className="flex gap-4 mt-6">
          {/* Edit button */}
          <a
            href={`/jobs/${job.id}/edit`}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Edit
          </a>

          {/* Delete button */}
          <DeleteJobButton jobId={job.id} />
        </div>
      )}
    </div>
  );
}
