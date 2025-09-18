import { dbAdmin } from "@/lib/firebaseAdmin"; // ensure this exists in src/lib

interface CompanyPageProps {
  params: {
    country: string;
    region: string;
    company: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { country, region, company } = params;

  // Firestore doc ID pattern (e.g. "us_tx_microsoft")
  const docId = `${country}_${region}_${company}`;
  const docRef = dbAdmin.collection("companies").doc(docId);

  let data: FirebaseFirestore.DocumentData | null = null;
  try {
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      data = snapshot.data() ?? null; // makes TS happy
    }
  } catch (err) {
    console.error("Error fetching company doc:", err);
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">
          No data found for {company} in {region}, {country}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">
          {data.name} ({data.country?.toUpperCase()} – {data.region?.toUpperCase()})
        </h1>
        <p className="text-sm text-gray-600">
          <span className="block">Product: {data.product}</span>
          <span className="block">Experience: {data.experience}</span>
        </p>
      </div>
    </div>
  );
}
