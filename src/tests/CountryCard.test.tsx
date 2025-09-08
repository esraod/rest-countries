import React from 'react'
import { render, screen } from '@testing-library/react'
import CountryCard from '@/components/CountryCard'
import type { Country } from '@/lib/api'

const country: Country = {
  cca3: 'NOR',
  name: { common: 'Norway' },
  region: 'Europe',
  population: 5400000,
  flags: { png: 'https://flagcdn.com/w320/no.png', alt: 'Flag of Norway' },
}

describe('<CountryCard />', () => {
  it('renders name, region, population and link', () => {
    render(<CountryCard country={country} />)

    expect(screen.getByText('Norway')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText(/Population:/i)).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /norway/i })
    expect(link).toHaveAttribute('href')
    expect(link.getAttribute('href')?.endsWith('/country/NOR')).toBe(true)
  })
})
