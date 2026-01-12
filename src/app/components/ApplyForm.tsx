"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [bidText, setBidText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitApplication = async () => {
    if (!bidText.trim()) return alert("Bid text is required");
    setSubmitting(true);

    const res = await fetch(`/api/jobs/apply/${jobId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // required
      body: JSON.stringify({ bidText }),
    });

    if (res.ok) {
      alert("Application submitted!");
      router.push(`/jobs/${jobId}`);
    } else {
      const error = await res.text();
      alert("Error: " + error);
    }

    setSubmitting(false);
  };

  return (
    <>
      <textarea
        placeholder="Write your bid or motivation"
        className="w-full sm:w-full max-w-2xl border rounded p-2 mb-4 sm:p-3"
        rows={6}
        value={bidText}
        onChange={(e) => setBidText(e.target.value)}
      />

      <button
        disabled={submitting}
        onClick={submitApplication}
        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </>
  );
}
