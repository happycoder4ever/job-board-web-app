import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // <- params is a Promise in this Next.js version
) {
  try {
    // unwrap params
    const resolvedParams = await params;
    const jobId = resolvedParams.id;

    console.log("Resolved jobId:", jobId);

    if (!jobId) {
      throw new Error("Job ID is missing");
    }

    // require job-seeker authentication
    const session = await requireRole("JOB_SEEKER");

    // parse request body
    const { bidText } = await req.json();
    if (!bidText || bidText.trim() === "") {
      return new Response("Bid text required", { status: 400 });
    }

    // prevent duplicate application
    const existing = await prisma.application.findFirst({
      where: { jobId, userId: session.user.id },
    });

    if (existing) {
      return new Response("Already applied", { status: 400 });
    }

    // create application
    await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        bidText,
        status: "PENDING",
      },
    });

    return new Response("Application submitted", { status: 201 });
  } catch (err) {
    console.error("Apply API error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
