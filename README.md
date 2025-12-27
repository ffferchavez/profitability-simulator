# Profitability Cockpit – Demo

A real-time data cockpit prototype for automotive & medical manufacturing decision-makers. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the login page, then use **Demo Login** to access the dashboard at `/dashboard`.

## Features

- **Profitability Overview**: Bar chart showing contribution margin per product
- **Cost Driver Breakdown**: Stacked chart visualizing cost components
- **Sensitivity Simulation**: Interactive sliders for energy/customs impact analysis
- **Risk Indicators**: Traffic-light system for competitor risk assessment
- **Scenario Persistence**: URL params + local storage for shareable what-if scenarios
- **CSV Export**: Download adjusted margin results for further analysis
- **Resilient Data Loading**: Server-side CSV parsing with validation and error boundaries
- **Multilanguage UI**: English, German, and Spanish labels
- **Currency Toggle**: Switch between EUR and USD displays

## Project Structure

```
/app              - Next.js app router pages (loading/error UI included)
/components       - React components (charts, sliders, risk matrix)
/lib              - Server-side data loading + validation
/utils            - Utility functions (formatting, calculations, exports)
/public/data      - Mock CSV data files
```

## Tech Stack

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Chart visualizations
- **PapaParse** - CSV parsing

## Data Files

- `public/data/products.csv` - Product financial data
- `public/data/competitor_risk.csv` - Competitor risk scores

## Documentation

See `DEMO_DOCUMENTATION.md` for:

- Executive summary
- Business insights
- Demo script
- Future enhancements

## Build

```bash
npm run build
npm start
```
