'use client';
import { useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CompanyPage({ params }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const docId = `${params.country}_${params.region}_${params.company}`;
      const docRef = doc(db, "companies", docId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setData(snapshot.data());
      } else {
        setData(null);
      }
      setLoading(false);
    }
    fetchData();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">
          No data found for {params.company} in {params.region}, {params.country}
        </h1>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">
          {data.name} ({data.country.toUpperCase()} – {data.region.toUpperCase()})
        </h1>
        <p className="text-sm text-gray-600">
          Product: {data.product} <br />
          Experience: {data.experience}
        </p>
      </div>
    </div>
  );
}
