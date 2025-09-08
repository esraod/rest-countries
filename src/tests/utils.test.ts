import React from 'react'
import { searchByName, filterByRegion, sortCountries } from '@/lib/utils'
import type { Country } from '@/lib/api'

const sample: Country[] = [
  {
    cca3: 'NOR',
    name: { common: 'Norway' },
    region: 'Europe',
    population: 5400000,
    flags: {},
  },
  {
    cca3: 'SWE',
    name: { common: 'Sweden' },
    region: 'Europe',
    population: 10500000,
    flags: {},
  },
  {
    cca3: 'JPN',
    name: { common: 'Japan' },
    region: 'Asia',
    population: 125000000,
    flags: {},
  },
]

describe('utils', () => {
  it('searchByName finds by substring, case-insensitive', () => {
    expect(searchByName(sample, 'nor').map((c) => c.cca3)).toEqual(['NOR'])
    expect(searchByName(sample, 'SW').map((c) => c.cca3)).toEqual(['SWE'])
  })

  it('filterByRegion filters correctly', () => {
    expect(filterByRegion(sample, 'Europe').length).toBe(2)
    expect(filterByRegion(sample, 'Asia').length).toBe(1)
    expect(filterByRegion(sample, 'All').length).toBe(3)
  })

  it('sortCountries sorts by name and population', () => {
    expect(sortCountries(sample, 'nameAsc').map((c) => c.cca3)).toEqual([
      'JPN',
      'NOR',
      'SWE',
    ])
    expect(sortCountries(sample, 'popAsc')[0].cca3).toBe('NOR')
    expect(sortCountries(sample, 'popDesc')[0].cca3).toBe('JPN')
  })
})
