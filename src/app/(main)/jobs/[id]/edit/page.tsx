import { requireRole } from "@/lib/require-role";

interface EditJobPageProps {
  params: { id: string };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const session = await requireRole("EMPLOYER");

  const jobId = params.id;

  // TODO: fetch job details for editing
  // const job = await prisma.job.findUnique({ where: { id: jobId } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Job {jobId}</h1>
      <p>Employer: {session.user.name}</p>
      {/* Edit job form goes here */}
    </div>
  );
}
