"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  const session = await requireRole("EMPLOYER");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;

  if (!title || !description || !location) {
    throw new Error("Missing fields");
  }

  await prisma.job.create({
    data: {
      title,
      description,
      location,
      employerId: session.user.id,
    },
  });

  redirect("/jobs");
}
