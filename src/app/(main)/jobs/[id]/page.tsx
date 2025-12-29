interface JobDetailPageProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Job Detail</h1>
      <p>Details for job ID: {id}</p>
    </div>
  );
}
