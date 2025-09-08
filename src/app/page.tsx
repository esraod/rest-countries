import { getAllCountries } from '@/lib/api'
import CountryCard from '@/components/CountryCard'

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-3xl font-bold mb-4">REST Countries</h1>
      <p className="mb-4 text-gray-600">Total countries: {countries.length}</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {countries.map((c) => (
          <CountryCard key={c.cca3} country={c} />
        ))}
      </div>
    </main>
  )
}
