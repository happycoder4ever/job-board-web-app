// jobs/page.tsx
import { JobsClient } from "@/app/components/JobsClient";

export default function JobsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-10 pb-16">
        <h1 className="text-3xl font-bold text-center">Job Listings</h1>
        <JobsClient />
      </div>
    </div>
  );
}
