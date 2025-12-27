'use client';

import { CompetitorRisk } from '@/utils/calculations';

interface RiskMatrixProps {
  risk: CompetitorRisk[];
}

export default function RiskMatrix({ risk }: RiskMatrixProps) {
  if (risk.length === 0) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Competitor Risk Indicators</h2>
          <p className="text-xs text-gray-500">Chinese competitor pressure assessment</p>
        </div>
        <div className="h-[220px] border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
          No risk data available.
        </div>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return { 
      bg: 'bg-red-500', 
      light: 'bg-gray-50', 
      border: 'border-gray-300', 
      text: 'text-gray-900', 
      label: 'text-gray-700',
      dot: 'bg-red-500'
    };
    if (score >= 0.4) return { 
      bg: 'bg-yellow-500', 
      light: 'bg-gray-50', 
      border: 'border-gray-300', 
      text: 'text-gray-700', 
      label: 'text-gray-600',
      dot: 'bg-yellow-500'
    };
    return { 
      bg: 'bg-green-500', 
      light: 'bg-gray-50', 
      border: 'border-gray-300', 
      text: 'text-gray-900', 
      label: 'text-gray-700',
      dot: 'bg-green-500'
    };
  };

  const getRiskLabel = (score: number) => {
    if (score >= 0.7) return 'High Risk';
    if (score >= 0.4) return 'Medium Risk';
    return 'Low Risk';
  };

  const highRiskCount = risk.filter(r => r.risk_score >= 0.7).length;
  const mediumRiskCount = risk.filter(r => r.risk_score >= 0.4 && r.risk_score < 0.7).length;
  const lowRiskCount = risk.filter(r => r.risk_score < 0.4).length;

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Competitor Risk Indicators</h2>
        <p className="text-xs text-gray-500">Chinese competitor pressure assessment</p>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">High Risk</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{highRiskCount} products</div>
        </div>
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">Medium Risk</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{mediumRiskCount} products</div>
        </div>
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">Low Risk</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{lowRiskCount} products</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {risk.map((item) => {
          const colors = getRiskColor(item.risk_score);
          return (
            <div
              key={item.product}
              className={`p-3 ${colors.light} rounded-md border ${colors.border} hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{item.product}</h3>
                <div className={`w-4 h-4 ${colors.dot} rounded-full flex items-center justify-center`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">Risk Score:</span>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {item.risk_score.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">Presence:</span>
                  <span className="text-xs font-semibold text-gray-800 capitalize">
                    {item.china_competitor_presence}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full inline-block ${colors.light} ${colors.label} border ${colors.border}`}>
                    {getRiskLabel(item.risk_score)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex gap-3 text-[10px] font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Low (&lt;0.4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Medium (0.4-0.69)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">High (≥0.7)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
