import Image from 'next/image'
import Link from 'next/link'
import type { Country } from '@/lib/api'

export default function CountryCard({ country }: { country: Country }) {
  const flag = country.flags?.svg || country.flags?.png || ''
  const alt = country.flags?.alt || `${country.name.common} flag`

  return (
    <Link
      href={`/country/${country.cca3}`}
      className="block rounded-2xl border p-4 shadow hover:shadow-md transition"
    >
      {flag && (
        <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-xl">
          <Image src={flag} alt={alt} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{country.name.common}</h3>
      <p className="text-sm text-gray-600">{country.region}</p>
      <p className="text-sm">
        Population: {country.population.toLocaleString()}
      </p>
    </Link>
  )
}
