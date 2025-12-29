import { requireRole } from "@/lib/require-role";

interface ApplyPageProps {
  params: { id: string };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const session = await requireRole("JOB_SEEKER");

  const jobId = params.id;

  // TODO: fetch job details if needed
  // const job = await prisma.job.findUnique({ where: { id: jobId } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Apply to Job {jobId}</h1>
      <p>Welcome, {session.user.name}. Fill the application form below.</p>
      {/* Application form goes here */}
    </div>
  );
}
