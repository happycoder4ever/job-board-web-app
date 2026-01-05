// app/api/jobs/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

type Params = { params: Promise<{ id: string }> }; // grouped route: params is a Promise

// GET /api/jobs/[id] - fetch job details
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      employer: { select: { id: true, name: true, email: true } },
      applications: { select: { id: true, status: true } },
    },
  });

  if (!job) {
    return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(job), { status: 200 });
}

// PATCH /api/jobs/[id] - update a job (employer only)
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const session = await requireRole("EMPLOYER");
  const { title, description, location } = await req.json();

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.employerId !== session.user.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  const updated = await prisma.job.update({
    where: { id },
    data: { title, description, location },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}

// DELETE /api/jobs/[id] - delete a job (employer only)
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const session = await requireRole("EMPLOYER");

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.employerId !== session.user.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  await prisma.job.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
