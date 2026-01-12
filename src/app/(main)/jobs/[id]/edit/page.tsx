import { requireRole } from "@/lib/require-role";
import { prisma } from "@/lib/prisma";
import { JobForm } from "@/app/components/JobForm";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;

  const session = await requireRole("EMPLOYER"); // get current user

  if (!id) notFound();

  const job = await prisma.job.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      employerId: true,
    },
  });

  if (!job) notFound();

  if (job.employerId !== session.user.id) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 sm:py-16">
      <h1 className="text-3xl font-bold text-center">Edit Job</h1>
      <p className="mt-2 text-center text-gray-600">Update your job details.</p>

      <div className="w-full max-w-[700px] mt-8">
        <JobForm
          job={{
            id: job.id,
            title: job.title,
            description: job.description,
            location: job.location,
          }}
        />
      </div>
    </div>
  );
}
