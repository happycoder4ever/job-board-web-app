"use client";

import { createJob } from "@/lib/actions/create-job";
import { updateJob } from "@/lib/actions/update-job";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
};

type Props = {
  job?: Job;
};

export function JobForm({ job }: Props) {
  const action = job
    ? updateJob.bind(null, job.id)
    : createJob;

  return (
    <form
      action={action}
      className="mx-auto mt-8 w-full max-w-3xl space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job title
        </label>
        <input
          name="title"
          defaultValue={job?.title}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-black focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={job?.description}
          rows={5}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-black focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          name="location"
          defaultValue={job?.location}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-black focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        {job ? "Update job" : "Post job"}
      </button>
    </form>
  );
}
