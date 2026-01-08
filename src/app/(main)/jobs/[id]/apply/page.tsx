// app/(main)/jobs/[id]/apply/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ApplyForm from "@/app/components/ApplyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplyPage({ params }: Props) {
  // Unwrap async params
  const resolvedParams = await params;
  const jobId = resolvedParams.id;

  // Get session
  const session = await getServerSession(authOptions);

  // Server-side protection
  if (!session || session.user.role !== "JOB_SEEKER") {
    redirect("/auth");
  }

  // Fetch job
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { employer: { select: { name: true } } },
  });

  if (!job) redirect("/jobs");

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-6">{job.description}</p>

      {/* Render client-side form */}
      <ApplyForm jobId={job.id} />
    </div>
  );
}
