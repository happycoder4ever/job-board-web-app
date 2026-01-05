import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { JobForm } from "@/app/components/JobForm";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: Props) {
  await requireRole("EMPLOYER");
  const resolvedParams = await params;  // <-- unwrap the promise
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }
  
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">Edit Job</h1>

      <p className="mt-2 text-center text-gray-600">
        Update your job listing details.
      </p>

      <JobForm
        job={{
          id: job.id,
          title: job.title,
          description: job.description,
          location: job.location,
        }}
      />
    </div>
  );
}
