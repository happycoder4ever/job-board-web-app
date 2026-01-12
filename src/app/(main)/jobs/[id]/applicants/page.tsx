import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/require-role";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplicantsPage({ params }: Props) {
  const { id: jobId } = await params;
  if (!jobId) notFound();

  // Must be employer
  const session = await requireRole("EMPLOYER");

  // Fetch job + ownership check
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      applications: {
        include: {
          applicant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!job) notFound();

  // Ownership check
  if (job.employerId !== session.user.id) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold mb-6">
        Applicants for: {job.title}
      </h1>

      {job.applications.length === 0 && (
        <p className="text-gray-500">No applications yet.</p>
      )}

      <div className="space-y-4">
        {job.applications.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{app.applicant.name}</p>
                <p className="text-sm text-gray-500">{app.applicant.email}</p>
              </div>

              <span className="text-sm text-gray-600">
                {app.status}
              </span>
            </div>

            <p className="text-gray-800 whitespace-pre-wrap">
              {app.bidText}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Applied at: {new Date(app.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
