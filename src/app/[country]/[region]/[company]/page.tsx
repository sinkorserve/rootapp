import { admin } from "@/lib/firebaseAdmin";

interface CompanyPageProps {
  params: {
    country: string;
    region: string;
    company: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { country, region, company } = params;
  const docId = `${country}_${region}_${company}`;
  const db = admin.firestore();

  // First, check if the document exists
  const docRef = db.collection("companies").doc(docId);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    // Document not found → show friendly message
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <p className="text-gray-700">
            No data found for <strong>{company}</strong> in {region}, {country}.
          </p>
        </div>
      </div>
    );
  }

  const data = snapshot.data() as {
    name: string;
    country: string;
    region: string;
    product?: string;
    experience?: string;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">
          {data.name} ({data.country.toUpperCase()} – {data.region.toUpperCase()})
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Product:</strong> {data.product ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Experience:</strong> {data.experience ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
