'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface CompanyData {
  name: string;
  country: string;
  region: string;
  product: string;
  experience: string;
}

interface CompanyPageProps {
  params: {
    country: string;
    region: string;
    company: string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const router = useRouter();
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { country, region, company } = params;

        // Sanitize params
        const sanitize = (s: string) =>
          s.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9_-]/g, '');

        const docId = `${sanitize(country)}_${sanitize(region)}_${sanitize(company)}`;
        const docRef = doc(db, 'companies', docId);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          setData(null);
        } else {
          setData(snapshot.data() as CompanyData);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  if (error) return (
    <div className="flex min-h-screen items-center justify-center text-red-600">
      Error: {error}
    </div>
  );

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
