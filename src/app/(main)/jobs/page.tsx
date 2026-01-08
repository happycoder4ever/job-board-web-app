import { JobsClient } from "@/app/components/JobsClient";

export default function JobsPage() {
  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-16">
      <h1 className="text-3xl font-bold text-center">Job Listings</h1>
      <JobsClient />
    </div>
  );
}
