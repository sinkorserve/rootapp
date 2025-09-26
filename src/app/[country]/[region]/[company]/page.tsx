import { db } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";

interface CompanyPageProps {
  params: {
    country: string;
    company: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { country, company } = params;
  const docId = `${country}_${company}`;

  try {
    const docRef = db.collection("companies").doc(docId);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      notFound();
    }

    const data = snapshot.data();

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md max-w-lg">
          <h1 className="text-2xl font-bold mb-4">{data?.name}</h1>
          <p className="text-gray-600">
            Country: {data?.country} <br />
            Product: {data?.product} <br />
            Experience: {data?.experience}
          </p>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error fetching company data</p>
      </div>
    );
  }
}
