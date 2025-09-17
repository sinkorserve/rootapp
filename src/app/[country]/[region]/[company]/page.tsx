'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface CompanyPageProps {
  params: {
    country: string;
    region: string;
    company: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { country, region, company } = params;

  // Build Firestore document ID (e.g. us_tx_microsoft)
  const docId = `${country}_${region}_${company}`;
  const docRef = doc(db, "companies", docId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">
          No data found for {company} in {region}, {country}
        </h1>
      </div>
    );
  }

  const data = snapshot.data();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">
          {data.name} ({data.country.toUpperCase()} – {data.region.toUpperCase()})
        </h1>
        <p className="text-sm text-gray-600">
          Product: {data.product}
          Experience: {data.experience}
        </p>
      </div>
    </div>
  );
}
