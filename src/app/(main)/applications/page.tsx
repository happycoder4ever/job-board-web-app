import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

export default async function MyApplicationsPage() {
  const session = await requireRole("JOB_SEEKER");

  const applications = await prisma.application.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 && (
        <p className="text-gray-500">You have not applied to any jobs yet.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <a
                  href={`/jobs/${app.job.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {app.job.title}
                </a>
                <p className="text-sm text-gray-500">{app.job.location}</p>
              </div>

              <span className="text-sm font-medium text-gray-700">
                {app.status}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Applied at: {new Date(app.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
