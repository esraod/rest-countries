# Country Explorer 🌍

A small web application built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.  
The app uses the [REST Countries API](https://restcountries.com/) to fetch and display country information.

---

## Features ✨

- **Browse countries** in a responsive grid with flags, names, regions, and populations.
- **Search** by country name (case-insensitive).
- **Filter** countries by region.
- **Sort** countries by name or population.
- **Country detail view** with additional info (capital, languages, currencies, timezones, borders).
- **Polished UI**
  - Fixed header with title, subtitle, search, and filters.
  - Light background (`bg-gray-200`) for a clean look.
  - Cards with consistent image sizing, subtle shadows, and tighter border radius.
  - Styled “Back” button with an icon.
- **Tests** with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).
  - Covers utility functions (search, filter, sort).
  - Covers rendering of the country cards.

---

## Tech Stack 🛠️

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

---

## Decisions & Trade-offs ⚖️

- Chose **REST Countries API** because it’s public, stable, and provides rich structured data.
- Used **Next.js App Router** with TypeScript for type safety and modern project structure.
- UI is intentionally simple and clean — focused on readability and usability rather than over-design.
- Added only basic tests (utils + card rendering) to meet the requirement without over-engineering.
- Used `fixed` header instead of `sticky` for consistent behavior across browsers.
- Images use Next.js `<Image>` with constrained sizes to avoid layout shift.

---

## Future Improvements 🔮

With more time, I’d:

- Add icons (e.g. for population, capital, region) to make detail pages more visual.
- Improve the UX & UI.
- Add pagination or infinite scroll for large datasets.
- Improve accessibility (ARIA roles, keyboard navigation).
- Add dark mode toggle.

---

## Getting Started 🚀

### Prerequisites

- Node.js v18+ (works best with v18.18 or later)
- npm (v9+)

### Install

```bash
git clone https://github.com/esraod/rest-countries.git
cd rest-countries
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

## Deliverables ✅

- A GitHub repository containing:
  - Source code (Next.js + Tailwind + TypeScript)
  - Minimal tests (utils + components)
  - README with project details, setup instructions, and notes
