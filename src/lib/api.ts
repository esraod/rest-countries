export type Country = {
  cca3: string
  name: { common: string }
}

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,cca3',
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) throw new Error('Failed to fetch countries')
  return (await res.json()) as Country[]
}
