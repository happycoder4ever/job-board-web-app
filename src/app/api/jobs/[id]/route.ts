// app/api/jobs/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  const session = await requireRole("EMPLOYER");
  const { title, description, location } = await req.json();

  const job = await prisma.job.findUnique({ where: { id: params.id } });

  if (!job || job.employerId !== session.user.id) {
    return new Response("Unauthorized", { status: 403 });
  }

  const updated = await prisma.job.update({
    where: { id: params.id },
    data: { title, description, location },
  });

  return new Response(JSON.stringify(updated));
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await requireRole("EMPLOYER");

  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job || job.employerId !== session.user.id) {
    return new Response("Unauthorized", { status: 403 });
  }

  await prisma.job.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}

export async function GET(req: Request, { params }: Params) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  return new Response(JSON.stringify(job));
}
