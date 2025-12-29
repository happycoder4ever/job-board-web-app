interface ApplyJobPageProps {
  params: { id: string };
}
export default async function ApplyJobPage({ params }: ApplyJobPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Apply to Job</h1>
      <p>Application form for job ID: {id}</p>
    </div>
  );
}
