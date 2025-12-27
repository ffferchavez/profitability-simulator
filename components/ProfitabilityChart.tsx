'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Product, calculateContributionMargin, calculateAdjustedContributionMargin } from '@/utils/calculations';

interface ProfitabilityChartProps {
  products: Product[];
  energyFactor?: number;
  customsFactor?: number;
}

export default function ProfitabilityChart({
  products,
  energyFactor = 0,
  customsFactor = 0,
}: ProfitabilityChartProps) {
  const data = products.map((product) => {
    const margin = energyFactor !== 0 || customsFactor !== 0
      ? calculateAdjustedContributionMargin(product, energyFactor, customsFactor)
      : calculateContributionMargin(product);
    
    return {
      product: product.product,
      margin: Math.round(margin),
    };
  });

  const totalMargin = data.reduce((sum, item) => sum + item.margin, 0);
  const profitableCount = data.filter(item => item.margin > 0).length;
  const lossMakingCount = data.filter(item => item.margin < 0).length;

  const formatEuro = (value: number) => {
    return `€${Math.abs(value).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Profitability Overview</h2>
        <p className="text-xs text-gray-500">Contribution margin per product</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-md p-2.5 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">Total Margin</div>
          <div className={`text-base font-bold ${totalMargin >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatEuro(totalMargin)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-2.5 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">Profitable</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{profitableCount} products</div>
        </div>
        <div className="bg-gray-50 rounded-md p-2.5 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">Loss-making</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{lossMakingCount} products</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis 
            dataKey="product" 
            stroke="#6b7280" 
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number) => [formatEuro(value), 'Contribution Margin']}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              padding: '10px'
            }}
            labelStyle={{ fontWeight: 600, color: '#111827', marginBottom: '4px', fontSize: '13px' }}
          />
          <Bar dataKey="margin" radius={[4, 4, 0, 0]} barSize={50}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.margin < 0 ? '#111827' : '#14b8a6'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-teal-500 rounded"></div>
          <span className="font-medium text-gray-600">Profitable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-gray-900 rounded"></div>
          <span className="font-medium text-gray-600">Loss-making</span>
        </div>
      </div>
    </div>
  );
}
