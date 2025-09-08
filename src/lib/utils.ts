import type { Country } from '@/lib/api'

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic'
  | 'All'
export type SortKey = 'nameAsc' | 'popAsc' | 'popDesc'

export function searchByName(items: Country[], term: string) {
  if (!term) return items
  const q = term.toLowerCase()
  return items.filter((c) => c.name.common.toLowerCase().includes(q))
}

export function filterByRegion(items: Country[], region: Region) {
  if (!region || region === 'All') return items
  return items.filter((c) => c.region === region)
}

export function sortCountries(items: Country[], key: SortKey) {
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
