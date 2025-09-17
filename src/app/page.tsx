'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country || !region || !company) return;

    const c = country.trim().toLowerCase();
    const r = region.trim().toLowerCase();
    const co = company.trim().toLowerCase().replace(/\s+/g, '-');

    router.push(`/${c}/${r}/${co}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Enter Company Info</h1>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Region"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Go
        </button>
      </form>
    </div>
  );
}
