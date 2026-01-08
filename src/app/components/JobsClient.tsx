"use client";

import { useEffect, useState } from "react";
import { JobList } from "@/app/components/JobList";

type Job = {
  id: string;
  title: string;
  location: string;
  employer: { name: string };
};

export function JobsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();

      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, [query, location]);

  return (
    <div className="w-full max-w-4xl mt-6">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {loading ? <p>Loading...</p> : <JobList jobs={jobs} />}
    </div>
  );
}
