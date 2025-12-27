import fs from 'node:fs/promises';
import path from 'node:path';
import Papa from 'papaparse';
import { CompetitorRisk, Product } from '@/utils/calculations';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.csv');
const RISK_FILE = path.join(DATA_DIR, 'competitor_risk.csv');

type RawRow = Record<string, string>;

function parseNumber(value: string | undefined): number | null {
  if (value === undefined) return null;
  const trimmed = value.replace(/,/g, '').trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeProduct(row: RawRow): Product | null {
  const product = (row.product ?? '').trim();
  if (!product) return null;

  const revenue = parseNumber(row.revenue);
  const material_cost = parseNumber(row.material_cost);
  const energy_cost = parseNumber(row.energy_cost);
  const customs = parseNumber(row.customs);
  const labor = parseNumber(row.labor);
  const other_costs = parseNumber(row.other_costs);

  if (
    revenue === null ||
    material_cost === null ||
    energy_cost === null ||
    customs === null ||
    labor === null ||
    other_costs === null
  ) {
    return null;
  }

  return {
    product,
    revenue,
    material_cost,
    energy_cost,
    customs,
    labor,
    other_costs,
  };
}

function normalizeRisk(row: RawRow): CompetitorRisk | null {
  const product = (row.product ?? '').trim();
  if (!product) return null;

  const riskScore = parseNumber(row.risk_score);
  if (riskScore === null) return null;

  const normalizedScore = Math.min(1, Math.max(0, riskScore));
  const presence = (row.china_competitor_presence ?? '').trim().toLowerCase();

  return {
    product,
    china_competitor_presence: presence || 'unknown',
    risk_score: normalizedScore,
  };
}

async function readCsvFile(filePath: string): Promise<RawRow[]> {
  const csvText = await fs.readFile(filePath, 'utf-8');
  const result = Papa.parse<RawRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    const message = result.errors.map((error) => error.message).join('; ');
    throw new Error(`Failed to parse ${path.basename(filePath)}: ${message}`);
  }

  return result.data;
}

export interface DashboardDataResult {
  products: Product[];
  risk: CompetitorRisk[];
  skipped: {
    products: number;
    risk: number;
  };
}

export async function loadDashboardData(): Promise<DashboardDataResult> {
  const [productRows, riskRows] = await Promise.all([
    readCsvFile(PRODUCTS_FILE),
    readCsvFile(RISK_FILE),
  ]);

  let skippedProducts = 0;
  let skippedRisk = 0;

  const products = productRows.reduce<Product[]>((acc, row) => {
    const normalized = normalizeProduct(row);
    if (normalized) {
      acc.push(normalized);
    } else {
      skippedProducts += 1;
    }
    return acc;
  }, []);

  const risk = riskRows.reduce<CompetitorRisk[]>((acc, row) => {
    const normalized = normalizeRisk(row);
    if (normalized) {
      acc.push(normalized);
    } else {
      skippedRisk += 1;
    }
    return acc;
  }, []);

  if (products.length === 0) {
    throw new Error('No valid product rows found in products.csv.');
  }

  return {
    products,
    risk,
    skipped: {
      products: skippedProducts,
      risk: skippedRisk,
    },
  };
}
