import { getAllCountries } from '@/lib/api'
import ExplorerPageClient from '@/components/ExplorerPageClient'

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="min-h-dvh w-full max-w-full bg-gray-200">
      <ExplorerPageClient countries={countries} />
    </main>
  )
}
