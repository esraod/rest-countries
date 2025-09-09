'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Country } from '@/lib/api'

// --- small utils (copied from your utils.ts to keep it self-contained) ---
type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic'
  | 'All'
type SortKey = 'nameAsc' | 'popAsc' | 'popDesc'

const REGIONS: Region[] = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic',
]
const SORTS: { key: SortKey; label: string }[] = [
  { key: 'nameAsc', label: 'Name (A–Z)' },
  { key: 'popAsc', label: 'Population (↑)' },
  { key: 'popDesc', label: 'Population (↓)' },
]

function searchByName(items: Country[], term: string) {
  if (!term) return items
  const q = term.toLowerCase()
  return items.filter((c) => c.name.common.toLowerCase().includes(q))
}
function filterByRegion(items: Country[], region: Region) {
  if (!region || region === 'All') return items
  return items.filter((c) => c.region === region)
}
function sortCountries(items: Country[], key: SortKey) {
  const arr = [...items]
  switch (key) {
    case 'nameAsc':
      return arr.sort((a, b) => a.name.common.localeCompare(b.name.common))
    case 'popAsc':
      return arr.sort((a, b) => a.population - b.population)
    case 'popDesc':
      return arr.sort((a, b) => b.population - a.population)
    default:
      return arr
  }
}

// --- CountryCard (inline to avoid extra imports) ---
function CountryCard({ country }: { country: Country }) {
  const flag = country.flags?.svg || country.flags?.png || ''
  const alt = country.flags?.alt || `${country.name.common} flag`
  return (
    <Link
      href={`/country/${country.cca3}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      {flag && (
        <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-xl">
          <Image
            src={flag}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800">
        {country.name.common}
      </h3>
      <p className="text-sm text-gray-600">{country.region}</p>
      <p className="text-sm text-gray-800">
        Population: {country.population.toLocaleString()}
      </p>
    </Link>
  )
}

export default function ExplorerPageClient({
  countries,
}: {
  countries: Country[]
}) {
  const [term, setTerm] = useState('')
  const [region, setRegion] = useState<Region>('All')
  const [sort, setSort] = useState<SortKey>('nameAsc')

  const deferredTerm = useDeferredValue(term)
  const visible = useMemo(() => {
    const s = searchByName(countries, deferredTerm)
    const f = filterByRegion(s, region)
    return sortCountries(f, sort)
  }, [countries, deferredTerm, region, sort])

  return (
    <>
      {/* FIXED merged header (title + subtitle + controls) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-50 border-b shadow-sm">
        <div className="mx-auto max-w-7xl w-full px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-600 text-center">
            Country Explorer
          </h1>
          <p className="mt-1 text-center text-sm text-gray-600">
            Search, filter, and explore nations around the globe.
          </p>

          {/* Controls, merged into the same header */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-gray-600">
            <input
              type="text"
              placeholder="Search by name…"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full sm:max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2"
              aria-label="Search countries by name"
            />
            <div className="flex gap-3">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                aria-label="Filter by region"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                aria-label="Sort countries"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to offset the fixed header height (tweak if you adjust header padding) */}
      <div className="h-36" />

      {/* Summary + Grid */}
      <div className="mx-auto max-w-7xl w-full px-6">
        <p className="text-sm text-gray-600 mb-2 m-4">
          Showing {visible.length}{' '}
          {visible.length === 1 ? 'country' : 'countries'}
        </p>
        {visible.length === 0 ? (
          <div className="text-gray-600 italic">
            No countries match your filters.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((c) => (
              <CountryCard key={c.cca3} country={c} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
