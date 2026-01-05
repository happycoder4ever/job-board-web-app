// app/api/jobs/route.ts
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

export async function POST(req: Request) {
  const session = await requireRole("EMPLOYER");

  const { title, description, location } = await req.json();

  if (!title || !description || !location) {
    return new Response("Missing fields", { status: 400 });
  }

  const job = await prisma.job.create({
    data: {
      title,
      description,
      location,
      employerId: session.user.id,
    },
  });

  return new Response(JSON.stringify(job), { status: 201 });
}

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(jobs));
}
