# Profitability Cockpit – Demo

A real-time data cockpit prototype for automotive & medical manufacturing decision-makers. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Features

- **Profitability Overview**: Bar chart showing contribution margin per product
- **Cost Driver Breakdown**: Stacked chart visualizing cost components
- **Sensitivity Simulation**: Interactive sliders for energy/customs impact analysis
- **Risk Indicators**: Traffic-light system for competitor risk assessment

## Project Structure

```
/app              - Next.js app router pages
/components       - React components (charts, sliders, risk matrix)
/utils            - Utility functions (CSV parsing, calculations)
/public/data      - Mock CSV data files
```

## Tech Stack

- **Next.js 14+** - React framework with App Router
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
