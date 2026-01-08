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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              title: {
                contains: q,
              },
            }
          : {},
        location
          ? {
              location: {
                contains: location,
              },
            }
          : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    include: { employer: { select: { name: true } } },
  });

  return Response.json(jobs);
}

