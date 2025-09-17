'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!country || !company) return;

    // normalize input (lowercase, no spaces)
    const normalizedCountry = country.trim().toLowerCase();
    const normalizedCompany = company.trim().toLowerCase().replace(/\s+/g, '-');

    router.push(`/${normalizedCountry}/${normalizedCompany}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">Find Your Company</h1>

        <label className="block mb-2 font-medium">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. us"
          required
        />

        <label className="block mb-2 font-medium">Company</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. microsoft"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Go
        </button>
      </form>
    </div>
  );
}
