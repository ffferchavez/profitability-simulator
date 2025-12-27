export interface Product {
  product: string;
  revenue: number;
  material_cost: number;
  energy_cost: number;
  customs: number;
  labor: number;
  other_costs: number;
}

export interface CompetitorRisk {
  product: string;
  china_competitor_presence: string;
  risk_score: number;
}

export interface MarginDataPoint {
  product: string;
  margin: number;
}

export const FACTOR_RANGE = {
  min: -0.5,
  max: 1,
};

export const FACTOR_STEP = 0.05;

export function calculateContributionMargin(product: Product): number {
  return (
    product.revenue -
    (product.material_cost +
      product.energy_cost +
      product.customs +
      product.labor +
      product.other_costs)
  );
}

export function clampFactor(value: number): number {
  return Math.min(FACTOR_RANGE.max, Math.max(FACTOR_RANGE.min, value));
}

export function parseFactor(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) return null;
  return clampFactor(parsed);
}

export function calculateAdjustedContributionMargin(
  product: Product,
  energyFactor: number,
  customsFactor: number
): number {
  const adjustedEnergyCost = product.energy_cost * (1 + energyFactor);
  const adjustedCustoms = product.customs * (1 + customsFactor);
  
  return (
    product.revenue -
    (product.material_cost +
      adjustedEnergyCost +
      adjustedCustoms +
      product.labor +
      product.other_costs)
  );
}

export function buildMarginSeries(
  products: Product[],
  energyFactor = 0,
  customsFactor = 0
): MarginDataPoint[] {
  return products.map((product) => {
    const margin = energyFactor !== 0 || customsFactor !== 0
      ? calculateAdjustedContributionMargin(product, energyFactor, customsFactor)
      : calculateContributionMargin(product);

    return {
      product: product.product,
      margin: Math.round(margin),
    };
  });
}

export function sumMargins(series: MarginDataPoint[]): number {
  return series.reduce((sum, item) => sum + item.margin, 0);
}
