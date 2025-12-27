interface EditJobPageProps {
  params: { id: string };
}
export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Job</h1>
      <p>Edit form for job ID: {id}</p>
    </div>
  );
}
