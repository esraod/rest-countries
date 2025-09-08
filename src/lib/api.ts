export type Country = {
  cca3: string
  name: { common: string }
  region: string
  population: number
  flags?: { svg?: string; png?: string; alt?: string }
}

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(
    // include just the fields we need
    'https://restcountries.com/v3.1/all?fields=name,cca3,region,population,flags',
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) throw new Error('Failed to fetch countries')
  return (await res.json()) as Country[]
}
