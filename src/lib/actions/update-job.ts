"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { redirect } from "next/navigation";

export async function updateJob(jobId: string, formData: FormData) {
  // Ensure user is an EMPLOYER
  const session = await requireRole("EMPLOYER");

  // Extract form fields
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;

  if (!title || !description || !location) {
    throw new Error("All fields are required");
  }

  // Fetch the job to ensure ownership
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Job not found");
  if (job.employerId !== session.user.id) {
    throw new Error("You do not have permission to edit this job");
  }

  // Update the job
  await prisma.job.update({
    where: { id: jobId },
    data: { title, description, location },
  });

  // Redirect back to job detail page
  redirect(`/jobs/${jobId}`);
}
