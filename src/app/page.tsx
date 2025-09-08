import { getAllCountries } from '@/lib/api'

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-3xl font-bold mb-4">REST Countries</h1>
      <p className="mb-4 text-gray-600">Total countries: {countries.length}</p>

      <ul className="list-disc pl-6 space-y-1">
        {countries.slice(0, 20).map((c) => (
          <li key={c.cca3} className="text-gray-800">
            {c.name.common}
          </li>
        ))}
      </ul>
    </main>
  )
}
