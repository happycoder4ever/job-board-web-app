"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { redirect } from "next/navigation";

export async function updateJob(jobId: string, formData: FormData) {
  const session = await requireRole("EMPLOYER");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;

  if (!title || !description || !location) {
    throw new Error("Missing fields");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job || job.employerId !== session.user.id) {
    redirect("/");
  }

  await prisma.job.update({
    where: { id: jobId },
    data: {
      title,
      description,
      location,
    },
  });

  redirect("/jobs");
}
