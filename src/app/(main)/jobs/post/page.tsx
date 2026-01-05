import { requireRole } from "@/lib/require-role";
import { JobForm } from "@/app/components/JobForm";

export default async function PostJobPage() {
  await requireRole("EMPLOYER");

  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">Post a New Job</h1>
      <p className="mt-2 text-center text-gray-600">Fill in the details below to post a new job.</p>
      <div className="w-full">
        <JobForm />
      </div>
    </div>
  );
}
