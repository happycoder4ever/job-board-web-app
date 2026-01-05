"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { redirect } from "next/navigation";

export async function deleteJob(jobId: string) {
  // Ensure the user is an EMPLOYER
  const session = await requireRole("EMPLOYER");

  // Fetch the job to verify it exists and ownership
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new Error("Job not found");

  if (job.employerId !== session.user.id) {
    throw new Error("You do not have permission to delete this job");
  }

  // Delete the job
  await prisma.job.delete({ where: { id: jobId } });

  // Redirect to jobs list after deletion
  redirect("/jobs");
}
