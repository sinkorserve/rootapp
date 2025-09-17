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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" required />
      <input value={region} onChange={e => setRegion(e.target.value)} placeholder="Region" required />
      <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" required />
      <button type="submit">Go</button>
    </form>
  );
}
