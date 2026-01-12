import { JobListItem } from "./JobListItem";

type Job = {
  id: string;
  title: string;
  location: string;
  employer: { name: string };
};

type Props = {
  jobs: Job[];
};

export function JobList({ jobs }: Props) {
  if (!jobs.length) {
    return (
      <p className="text-center text-gray-600 mt-6">No jobs posted yet.</p>
    );
  }

  return (
    <div className="mt-6 w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobListItem
          key={job.id}
          id={job.id}
          title={job.title}
          location={job.location}
          employerName={job.employer.name}
        />
      ))}
    </div>
  );
}
