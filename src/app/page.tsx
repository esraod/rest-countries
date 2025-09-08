import { getAllCountries } from '@/lib/api'

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-3xl font-bold">REST Countries</h1>
      <p className="mt-2 text-gray-600">Antal länder: {countries.length}</p>
    </main>
  )
}
