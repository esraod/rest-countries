'use client'

import { useMemo, useState, useDeferredValue } from 'react'
import CountryCard from '@/components/CountryCard'
import type { Country } from '@/lib/api'
import {
  searchByName,
  filterByRegion,
  sortCountries,
  type Region,
  type SortKey,
} from '@/lib/utils'

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

export default function CountryExplorer({
  countries,
}: {
  countries: Country[]
}) {
  const [term, setTerm] = useState('')
  const [region, setRegion] = useState<Region>('All')
  const [sort, setSort] = useState<SortKey>('nameAsc')

  // Smooth typing UX
  const deferredTerm = useDeferredValue(term)

  const visible = useMemo(() => {
    const s = searchByName(countries, deferredTerm)
    const f = filterByRegion(s, region)
    return sortCountries(f, sort)
  }, [countries, deferredTerm, region, sort])

  return (
    <section>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full sm:max-w-xs rounded-xl border px-3 py-2"
        />

        <div className="flex gap-3">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="rounded-xl border px-3 py-2"
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
            className="rounded-xl border px-3 py-2"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results summary */}
      <p className="text-sm text-gray-600 mb-2">
        Showing {visible.length}{' '}
        {visible.length === 1 ? 'country' : 'countries'}
      </p>

      {/* Grid */}
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
    </section>
  )
}
