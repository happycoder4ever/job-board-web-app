"use client";

import { useState } from "react";
import { deleteJob } from "@/lib/actions/delete-job";

type Props = {
  jobId: string;
  onDeleted?: () => void; // optional callback after deletion
};

export function DeleteJobButton({ jobId, onDeleted }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      setLoading(true);
      setError(null);
      await deleteJob(jobId);
      onDeleted?.(); // optional callback
    } catch (err: any) {
      setError(err?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete Job"}
      </button>
    </div>
  );
}
