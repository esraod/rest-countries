import { getAllCountries } from '@/lib/api'
import CountryExplorer from '@/components/CountryExplorer'

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-3xl font-bold mb-4">REST Countries</h1>
      <p className="mb-4 text-gray-600">Total countries: {countries.length}</p>

      <CountryExplorer countries={countries} />
    </main>
  )
}
