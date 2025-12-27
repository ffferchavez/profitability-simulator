'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Product } from '@/utils/calculations';
import { useI18n } from '@/components/I18nProvider';

interface CostDriverChartProps {
  products: Product[];
}

export default function CostDriverChart({ products }: CostDriverChartProps) {
  const { messages, formatters } = useI18n();
  const labels = messages.cost.labels;
  const data = products.map((product) => ({
    product: product.product,
    [labels.material]: product.material_cost,
    [labels.energy]: product.energy_cost,
    [labels.customs]: product.customs,
    [labels.labor]: product.labor,
    [labels.other]: product.other_costs,
  }));

  const totalCosts = products.reduce((sum, p) => 
    sum + p.material_cost + p.energy_cost + p.customs + p.labor + p.other_costs, 0
  );

  const colors = {
    [labels.material]: '#111827',      // Black - darkest
    [labels.energy]: '#14b8a6',        // Turquoise - visible
    [labels.customs]: '#475569',       // Slate gray - medium dark
    [labels.labor]: '#64748b',         // Slate gray - medium
    [labels.other]: '#94a3b8',         // Slate gray - lighter but still visible
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {messages.cost.title}
        </h2>
        <p className="text-sm text-gray-500">{messages.cost.subtitle}</p>
      </div>

      <div className="mb-4 bg-gray-50 rounded-md p-2.5 border border-gray-200">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{messages.cost.totalCosts}:</span>
          <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatters.currency(totalCosts)}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-[280px] border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
          {messages.cost.noData}
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
              tickFormatter={(value) => formatters.currencyCompact(value as number)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatters.currency(value), name]}
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
            <Bar dataKey={labels.material} stackId="a" fill={colors[labels.material]} radius={[0, 0, 0, 0]} />
            <Bar dataKey={labels.energy} stackId="a" fill={colors[labels.energy]} />
            <Bar dataKey={labels.customs} stackId="a" fill={colors[labels.customs]} />
            <Bar dataKey={labels.labor} stackId="a" fill={colors[labels.labor]} />
            <Bar dataKey={labels.other} stackId="a" fill={colors[labels.other]} radius={[0, 0, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
