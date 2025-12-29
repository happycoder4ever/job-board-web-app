"use client";

import { createJob } from "@/lib/actions/create-job";

export function JobForm() {
  return (
    <form
      action={createJob}
      className="mx-auto mt-8 max-w-lg space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job title
        </label>
        <input
          name="title"
          placeholder="Senior Frontend Developer"
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
          placeholder="Describe the role, responsibilities, and requirements"
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
          placeholder="Remote / Berlin / Warsaw"
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-black focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Post job
      </button>
    </form>
  );
}
