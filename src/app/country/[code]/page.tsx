import { getCountryByCode } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = { params: Promise<{ code: string }> }

export default async function CountryPage({ params }: Props) {
  const { code } = await params
  const country = await getCountryByCode(code)

  if (!country) {
    return (
      <main className="min-h-dvh bg-gray-200 p-6">
        <p>Country not found.</p>
        <Link href="/" className="text-blue-600 underline">
          ← Back
        </Link>
      </main>
    )
  }

  const flag = country.flags?.svg || country.flags?.png || ''

  return (
    <main className="min-h-dvh bg-gray-200 p-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:bg-gray-50 transition"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        {flag && (
          <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={flag}
              alt={country.flags?.alt || `${country.name.common} flag`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="lg:w-1/2 space-y-2 text-gray-600">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
          {country.capital && (
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital.join(', ')}
            </p>
          )}
          {country.languages && (
            <p>
              <span className="font-semibold">Languages:</span>{' '}
              {Object.values(country.languages).join(', ')}
            </p>
          )}
          {country.currencies && (
            <p>
              <span className="font-semibold">Currencies:</span>{' '}
              {Object.values(country.currencies ?? {})
                .map((c) => c.name)
                .join(', ')}
            </p>
          )}
          {country.timezones && (
            <p>
              <span className="font-semibold">Timezones:</span>{' '}
              {country.timezones.join(', ')}
            </p>
          )}
          {country.borders && country.borders.length > 0 && (
            <p>
              <span className="font-semibold">Borders:</span>{' '}
              {country.borders.join(', ')}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
