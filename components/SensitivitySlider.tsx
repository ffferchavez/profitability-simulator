'use client';

import { useState, useEffect } from 'react';
import { Product, calculateAdjustedContributionMargin, calculateContributionMargin } from '@/utils/calculations';

interface SensitivitySliderProps {
  products: Product[];
  onUpdate?: (energyFactor: number, customsFactor: number) => void;
}

export default function SensitivitySlider({ products, onUpdate }: SensitivitySliderProps) {
  const [energyFactor, setEnergyFactor] = useState(0);
  const [customsFactor, setCustomsFactor] = useState(0);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(energyFactor, customsFactor);
    }
  }, [energyFactor, customsFactor, onUpdate]);

  // Calculate baseline (original) margins
  const baselineData = products.map((product) => ({
    product: product.product,
    margin: Math.round(calculateContributionMargin(product)),
  }));

  // Calculate adjusted margins
  const adjustedData = products.map((product) => {
    const margin = calculateAdjustedContributionMargin(product, energyFactor, customsFactor);
    return {
      product: product.product,
      margin: Math.round(margin),
    };
  });

  const baselineTotal = baselineData.reduce((sum, item) => sum + item.margin, 0);
  const adjustedTotal = adjustedData.reduce((sum, item) => sum + item.margin, 0);
  const marginChange = adjustedTotal - baselineTotal;
  const marginChangePercent = baselineTotal !== 0 ? ((marginChange / Math.abs(baselineTotal)) * 100).toFixed(1) : '0';

  const formatEuro = (value: number) => {
    return `€${Math.abs(value).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const profitableBefore = baselineData.filter(item => item.margin > 0).length;
  const profitableAfter = adjustedData.filter(item => item.margin > 0).length;
  const productsAffected = profitableBefore - profitableAfter;

  const resetSliders = () => {
    setEnergyFactor(0);
    setCustomsFactor(0);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 pb-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900 mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Sensitivity Simulation</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          Adjust sliders to see real-time impact on profitability charts.
        </p>
      </div>

      {/* Impact Summary */}
      {(energyFactor !== 0 || customsFactor !== 0) && (
        <div className="mb-5 p-3.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-900">Impact Summary</span>
            <button
              onClick={resetSliders}
              className="text-[10px] font-medium text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-gray-500 mb-1">Margin Change</div>
              <div className={`text-sm font-bold ${marginChange >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {marginChange >= 0 ? '+' : ''}{formatEuro(marginChange)}
                <span className="text-xs font-normal text-gray-600 ml-1">({marginChangePercent}%)</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-1">Products at Risk</div>
              <div className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {productsAffected > 0 ? `${productsAffected} product${productsAffected > 1 ? 's' : ''}` : 'None'}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sliders */}
      <div className="space-y-5 mb-5">
        {/* Energy Cost Slider */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-900 mb-1">Energy Cost Impact</label>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Simulate changes in energy prices. +50% = 1.5x higher costs.
              </p>
            </div>
            <div className="ml-3 text-right">
              <div className={`text-base font-bold ${energyFactor >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {energyFactor > 0 ? '+' : ''}{Math.round(energyFactor * 100)}%
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {energyFactor === 0 ? 'No change' : energyFactor > 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
          <input
            type="range"
            min="-0.5"
            max="1"
            step="0.05"
            value={energyFactor}
            onChange={(e) => setEnergyFactor(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700 transition-colors"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-medium">
            <span>-50%</span>
            <span className="text-gray-700 font-semibold">0%</span>
            <span>+100%</span>
          </div>
        </div>

        {/* Customs Slider */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-900 mb-1">Customs & Import Fees</label>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Simulate changes in customs duties. +30% = 1.3x higher fees.
              </p>
            </div>
            <div className="ml-3 text-right">
              <div className={`text-base font-bold ${customsFactor >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {customsFactor > 0 ? '+' : ''}{Math.round(customsFactor * 100)}%
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {customsFactor === 0 ? 'No change' : customsFactor > 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
          <input
            type="range"
            min="-0.5"
            max="1"
            step="0.05"
            value={customsFactor}
            onChange={(e) => setCustomsFactor(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700 transition-colors"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-medium">
            <span>-50%</span>
            <span className="text-gray-700 font-semibold">0%</span>
            <span>+100%</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-3">
        <div className="bg-gray-50 rounded-lg p-3.5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Baseline Margin</div>
            <div className="text-xs text-gray-500">{profitableBefore} profitable</div>
          </div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatEuro(baselineTotal)}
          </div>
        </div>
        <div className={`rounded-lg p-3.5 border-2 ${marginChange < 0 ? 'bg-red-50 border-red-200' : marginChange > 0 ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Adjusted Margin</div>
            <div className={`text-xs ${marginChange < 0 ? 'text-red-700' : marginChange > 0 ? 'text-teal-700' : 'text-gray-500'}`}>
              {profitableAfter} profitable
              {productsAffected > 0 && (
                <span className="font-semibold"> ({productsAffected} at risk)</span>
              )}
            </div>
          </div>
          <div className={`text-base font-bold ${marginChange < 0 ? 'text-red-900' : marginChange > 0 ? 'text-teal-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatEuro(adjustedTotal)}
          </div>
          {marginChange !== 0 && (
            <div className={`text-xs mt-1.5 font-medium ${marginChange < 0 ? 'text-red-700' : 'text-teal-700'}`}>
              {marginChange >= 0 ? '+' : ''}{formatEuro(marginChange)} ({marginChangePercent}%)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
