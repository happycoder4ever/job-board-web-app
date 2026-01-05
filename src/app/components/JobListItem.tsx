import Link from "next/link";

type Props = {
  id: string;
  title: string;
  location: string;
  employerName: string;
};

export function JobListItem({ id, title, location, employerName }: Props) {
  return (
    <Link
      href={`/jobs/${id}`}
      className="block rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-500 mt-1 text-sm">Posted by {employerName}</p>
    </Link>
  );
}
