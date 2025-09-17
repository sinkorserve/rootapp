interface CompanyPageProps {
  params: {
    country: string;
    company: string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const { country, company } = params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to {company.toUpperCase()} in {country.toUpperCase()}
        </h1>
        <p>This is the landing page for {company} located in {country}.</p>
      </div>
    </div>
  );
}
