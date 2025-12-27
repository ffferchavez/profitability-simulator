'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Product } from '@/utils/calculations';
import { formatEuro, formatEuroCompactK } from '@/utils/format';

interface CostDriverChartProps {
  products: Product[];
}

export default function CostDriverChart({ products }: CostDriverChartProps) {
  const data = products.map((product) => ({
    product: product.product,
    'Material Cost': product.material_cost,
    'Energy Cost': product.energy_cost,
    'Customs': product.customs,
    'Labor': product.labor,
    'Other Costs': product.other_costs,
  }));

  const totalCosts = products.reduce((sum, p) => 
    sum + p.material_cost + p.energy_cost + p.customs + p.labor + p.other_costs, 0
  );

  const colors = {
    'Material Cost': '#111827',      // Black - darkest
    'Energy Cost': '#14b8a6',        // Turquoise - visible
    'Customs': '#475569',             // Slate gray - medium dark
    'Labor': '#64748b',               // Slate gray - medium
    'Other Costs': '#94a3b8',         // Slate gray - lighter but still visible
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Cost Driver Breakdown</h2>
        <p className="text-xs text-gray-500">Cost components per product</p>
      </div>

      <div className="mb-4 bg-gray-50 rounded-md p-2.5 border border-gray-200">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Costs:</span>
          <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{formatEuro(totalCosts)}</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-[280px] border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
          No cost data available.
        </div>
      ) : (
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
              tickFormatter={(value) => formatEuroCompactK(value as number)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatEuro(value), name]}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '10px'
              }}
              labelStyle={{ fontWeight: 600, color: '#111827', marginBottom: '4px', fontSize: '13px' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="square"
              iconSize={8}
            />
            <Bar dataKey="Material Cost" stackId="a" fill={colors['Material Cost']} radius={[0, 0, 0, 0]} />
            <Bar dataKey="Energy Cost" stackId="a" fill={colors['Energy Cost']} />
            <Bar dataKey="Customs" stackId="a" fill={colors['Customs']} />
            <Bar dataKey="Labor" stackId="a" fill={colors['Labor']} />
            <Bar dataKey="Other Costs" stackId="a" fill={colors['Other Costs']} radius={[0, 0, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
