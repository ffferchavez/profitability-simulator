import DashboardClient from '@/components/DashboardClient';
import { loadDashboardData } from '@/lib/data';
import { parseFactor } from '@/utils/calculations';
import { getLocale } from '@/utils/i18n';
import { getCurrency } from '@/utils/currency';

type SearchParams = {
  energy?: string | string[];
  customs?: string | string[];
  lang?: string | string[];
  currency?: string | string[];
};

export default async function Dashboard({ searchParams }: { searchParams?: SearchParams }) {
  const { products, risk, skipped } = await loadDashboardData();
  const energyParam = Array.isArray(searchParams?.energy) ? searchParams?.energy[0] : searchParams?.energy;
  const customsParam = Array.isArray(searchParams?.customs) ? searchParams?.customs[0] : searchParams?.customs;
  const langParam = Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang;
  const currencyParam = Array.isArray(searchParams?.currency) ? searchParams?.currency[0] : searchParams?.currency;
  const initialEnergyFactor = parseFactor(energyParam) ?? 0;
  const initialCustomsFactor = parseFactor(customsParam) ?? 0;
  const initialLocale = getLocale(langParam);
  const initialCurrency = getCurrency(currencyParam);

  return (
    <DashboardClient
      products={products}
      risk={risk}
      dataIssues={skipped}
      initialEnergyFactor={initialEnergyFactor}
      initialCustomsFactor={initialCustomsFactor}
      initialLocale={initialLocale}
      initialCurrency={initialCurrency}
    />
  );
}
