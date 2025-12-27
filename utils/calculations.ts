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

