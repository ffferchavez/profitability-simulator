'use client';

import { useEffect, useState } from 'react';
import { parseCsv } from '@/utils/parseCsv';
import { Product, CompetitorRisk, calculateContributionMargin } from '@/utils/calculations';
import ProfitabilityChart from '@/components/ProfitabilityChart';
import CostDriverChart from '@/components/CostDriverChart';
import SensitivitySlider from '@/components/SensitivitySlider';
import RiskMatrix from '@/components/RiskMatrix';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [risk, setRisk] = useState<CompetitorRisk[]>([]);
  const [energyFactor, setEnergyFactor] = useState(0);
  const [customsFactor, setCustomsFactor] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, riskData] = await Promise.all([
          parseCsv<Product>('/data/products.csv'),
          parseCsv<CompetitorRisk>('/data/competitor_risk.csv'),
        ]);

        // Convert string numbers to actual numbers
        const processedProducts = productsData.map((p) => ({
          ...p,
          revenue: Number(p.revenue),
          material_cost: Number(p.material_cost),
          energy_cost: Number(p.energy_cost),
          customs: Number(p.customs),
          labor: Number(p.labor),
          other_costs: Number(p.other_costs),
        }));

        const processedRisk = riskData.map((r) => ({
          ...r,
          risk_score: Number(r.risk_score),
        }));

        setProducts(processedProducts);
        setRisk(processedRisk);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSensitivityUpdate = (energy: number, customs: number) => {
    setEnergyFactor(energy);
    setCustomsFactor(customs);
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalMargin = products.reduce((sum, p) => sum + calculateContributionMargin(p), 0);
  const marginPercentage = totalRevenue > 0 ? ((totalMargin / totalRevenue) * 100).toFixed(1) : '0';

  const formatEuro = (value: number) => {
    return `€${Math.abs(value).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Enhanced Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Profitability Cockpit</h1>
              <p className="text-xs text-gray-500">
                Real-time visibility into product profitability, cost drivers, and competitive risk
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Currency</span>
              <span className="text-base font-bold text-gray-900">€</span>
            </div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-teal-500 rounded-full"></div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">Total Revenue</div>
                <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{formatEuro(totalRevenue)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-1 h-8 rounded-full ${totalMargin >= 0 ? 'bg-teal-500' : 'bg-gray-400'}`}></div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">Total Margin</div>
                <div className={`text-lg font-bold ${totalMargin >= 0 ? 'text-teal-600' : 'text-gray-600'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {formatEuro(totalMargin)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">Margin %</div>
                <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{marginPercentage}%</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="w-1 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">Products</div>
                <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{products.length}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar with Sensitivity Simulation */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto sticky top-[120px] h-[calc(100vh-120px)] shadow-sm">
          <div className="p-5">
            <SensitivitySlider products={products} onUpdate={handleSensitivityUpdate} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1">
              <ProfitabilityChart
                products={products}
                energyFactor={energyFactor}
                customsFactor={customsFactor}
              />
            </div>
            <div className="lg:col-span-1">
              <CostDriverChart products={products} />
            </div>
            <div className="lg:col-span-2">
              <RiskMatrix risk={risk} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
