interface ViewApplicantsPageProps {
  params: {id: string};
}
export default async function ViewApplicantsPage({params} : ViewApplicantsPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Applicants for Job</h1>
      <p>List of applicants for job ID: {id}</p>
    </div>
  );
}
