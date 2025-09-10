'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import type { Country } from '@/lib/api'
import CountryCard from './CountryCard'
import {
  filterByRegion,
  Region,
  REGIONS,
  searchByName,
  sortCountries,
  SortKey,
  SORTS,
} from '@/lib/utils'

// Main client component for exploring countries
export default function ExplorerPageClient({
  countries,
}: {
  countries: Country[]
}) {
  const [term, setTerm] = useState('') // search term
  const [region, setRegion] = useState<Region>('All') // region filter
  const [sort, setSort] = useState<SortKey>('nameAsc') // sort option

  const deferredTerm = useDeferredValue(term) // smooth search input

  // Apply search, filter, and sort
  const visible = useMemo(() => {
    const s = searchByName(countries, deferredTerm)
    const f = filterByRegion(s, region)
    return sortCountries(f, sort)
  }, [countries, deferredTerm, region, sort])

  return (
    <>
      {/* Header with controls */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-50 border-b shadow-sm">
        <div className="mx-auto max-w-7xl w-full px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-600 text-center">
            Country Explorer
          </h1>
          <p className="mt-1 text-center text-sm text-gray-600">
            Search, filter, and explore nations around the globe.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-gray-600">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name…"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full sm:max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2"
              aria-label="Search countries by name"
            />

            {/* Region + Sort */}
            <div className="flex gap-3">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
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

      <div className="h-36" />

      {/* Country grid */}
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
