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

  // Firestore docId format: country_region_company
  const docId = `${country}_${region}_${company}`;
  const db = admin.firestore();
  const docRef = db.collection("companies").doc(docId);

  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">
          No data found for <strong>{company}</strong> in{" "}
          {region}, {country}
        </h1>
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
          {data.name} ({data.country.toUpperCase()} –{" "}
          {data.region.toUpperCase()})
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
