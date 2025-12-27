import DashboardClient from '@/components/DashboardClient';
import { loadDashboardData } from '@/lib/data';
import { parseFactor } from '@/utils/calculations';

type SearchParams = {
  energy?: string | string[];
  customs?: string | string[];
};

export default async function Dashboard({ searchParams }: { searchParams?: SearchParams }) {
  const { products, risk, skipped } = await loadDashboardData();
  const energyParam = Array.isArray(searchParams?.energy) ? searchParams?.energy[0] : searchParams?.energy;
  const customsParam = Array.isArray(searchParams?.customs) ? searchParams?.customs[0] : searchParams?.customs;
  const initialEnergyFactor = parseFactor(energyParam) ?? 0;
  const initialCustomsFactor = parseFactor(customsParam) ?? 0;

  return (
    <DashboardClient
      products={products}
      risk={risk}
      dataIssues={skipped}
      initialEnergyFactor={initialEnergyFactor}
      initialCustomsFactor={initialCustomsFactor}
    />
  );
}
