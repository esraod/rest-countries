import type { Country } from '@/lib/api' // Import Country type definition

// Supported regions for filtering
export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic'
  | 'All'

// Supported sort options
export type SortKey = 'nameAsc' | 'popAsc' | 'popDesc'

// List of available regions including "All"
export const REGIONS: Region[] = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic',
]

// List of available sort options with labels
export const SORTS: { key: SortKey; label: string }[] = [
  { key: 'nameAsc', label: 'Name (A–Z)' },
  { key: 'popAsc', label: 'Population (↑)' },
  { key: 'popDesc', label: 'Population (↓)' },
]

// Search countries by name (case-insensitive match)
export function searchByName(items: Country[], term: string) {
  if (!term) return items
  const q = term.toLowerCase()
  return items.filter((c) => c.name.common.toLowerCase().includes(q))
}

// Filter countries by region
export function filterByRegion(items: Country[], region: Region) {
  if (!region || region === 'All') return items
  return items.filter((c) => c.region === region)
}

// Sort countries by selected key (name or population)
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
