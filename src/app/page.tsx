'use client';

import { useState } from 'react';

export default function HomePage() {
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to subdomain landing page
    window.location.href = `https://${country}.${zip}.yourdomain.com`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Enter Location</h1>

        <div>
          <label className="block mb-1 font-medium">Country</label>
          <input
            type="text"
            placeholder="US"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Zip Code</label>
          <input
            type="text"
            placeholder="75001"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Continue
        </button>
      </form>
    </div>
  );
}
