import { requireRole } from "@/lib/require-role";

interface ApplicantsPageProps {
  params: { id: string };
}

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const session = await requireRole("EMPLOYER");

  const jobId = params.id;

  // TODO: fetch job + applicants
  // const applicants = await prisma.application.findMany({ where: { jobId } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Applicants for Job {jobId}</h1>
      <p>Employer: {session.user.name}</p>
      {/* Applicants list goes here */}
    </div>
  );
}
