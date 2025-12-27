'use client';

import { CompetitorRisk } from '@/utils/calculations';
import { useI18n } from '@/components/I18nProvider';

interface RiskMatrixProps {
  risk: CompetitorRisk[];
}

export default function RiskMatrix({ risk }: RiskMatrixProps) {
  const { messages } = useI18n();
  if (risk.length === 0) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {messages.risk.title}
          </h2>
          <p className="text-sm text-gray-500">{messages.risk.subtitle}</p>
        </div>
        <div className="h-[220px] border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
          {messages.risk.noData}
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
    if (score >= 0.7) return messages.risk.labelHigh;
    if (score >= 0.4) return messages.risk.labelMedium;
    return messages.risk.labelLow;
  };

  const formatPresence = (value: string) => {
    switch (value.toLowerCase()) {
      case 'high':
        return messages.risk.presenceHigh;
      case 'medium':
        return messages.risk.presenceMedium;
      case 'low':
        return messages.risk.presenceLow;
      default:
        return value;
    }
  };

  const productLabel = (count: number) =>
    count === 1 ? messages.common.product : messages.common.products;

  const highRiskCount = risk.filter(r => r.risk_score >= 0.7).length;
  const mediumRiskCount = risk.filter(r => r.risk_score >= 0.4 && r.risk_score < 0.7).length;
  const lowRiskCount = risk.filter(r => r.risk_score < 0.4).length;

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {messages.risk.title}
        </h2>
        <p className="text-sm text-gray-500">{messages.risk.subtitle}</p>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{messages.risk.highRisk}</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {highRiskCount} {productLabel(highRiskCount)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{messages.risk.mediumRisk}</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {mediumRiskCount} {productLabel(mediumRiskCount)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{messages.risk.lowRisk}</div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {lowRiskCount} {productLabel(lowRiskCount)}
          </div>
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
                  <span className="text-sm font-medium text-gray-600">{messages.risk.riskScore}:</span>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {item.risk_score.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{messages.risk.presence}:</span>
                  <span className="text-sm font-semibold text-gray-800 capitalize">
                    {formatPresence(item.china_competitor_presence)}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${colors.light} ${colors.label} border ${colors.border}`}>
                    {getRiskLabel(item.risk_score)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">{messages.risk.legendLow}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">{messages.risk.legendMedium}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">{messages.risk.legendHigh}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
