// src/app/[country]/[region]/[company]/page.tsx
import { admin } from "@/lib/firebaseAdmin"; // make sure this points to your Admin SDK
import React from "react";

interface CompanyPageProps {
  params: {
    country: string;
    region: string;
    company: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { country, region, company } = params;

  // Construct Firestore document ID
  const docId = `${country}_${region}_${company}`;
  console.log("Params received:", params);
  console.log("Looking for doc ID:", docId);

  try {
    const docRef = admin.firestore().collection("companies").doc(docId);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      console.warn(`Document not found: ${docId}`);
      return (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-xl">
            No data found for {company} in {region}, {country}
          </h1>
        </div>
      );
    }

    const data = snapshot.data();
    console.log("Document data:", data);

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md max-w-lg">
          <h1 className="text-2xl font-bold mb-4">
            {data?.name} ({data?.country?.toUpperCase()} – {data?.region?.toUpperCase()})
          </h1>
          <p className="text-sm text-gray-600">
            Product: {data?.product}
            <br />
            Experience: {data?.experience}
          </p>
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error("Error fetching document:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl text-red-600">
          Error fetching data. Check server logs.
        </h1>
      </div>
    );
  }
}
