'use client';

import { Product, buildMarginSeries, FACTOR_STEP } from '@/utils/calculations';
import { useI18n } from '@/components/I18nProvider';

interface SensitivitySliderProps {
  products: Product[];
  energyFactor: number;
  customsFactor: number;
  minFactor: number;
  maxFactor: number;
  onUpdate: (energyFactor: number, customsFactor: number) => void;
}

export default function SensitivitySlider({
  products,
  energyFactor,
  customsFactor,
  minFactor,
  maxFactor,
  onUpdate,
}: SensitivitySliderProps) {
  const { messages, formatters } = useI18n();
  const baselineData = buildMarginSeries(products, 0, 0);
  const adjustedData = buildMarginSeries(products, energyFactor, customsFactor);

  const baselineTotal = baselineData.reduce((sum, item) => sum + item.margin, 0);
  const adjustedTotal = adjustedData.reduce((sum, item) => sum + item.margin, 0);
  const marginChange = adjustedTotal - baselineTotal;
  const marginChangePercent =
    baselineTotal !== 0 ? (marginChange / Math.abs(baselineTotal)) * 100 : 0;

  const profitableBefore = baselineData.filter(item => item.margin > 0).length;
  const profitableAfter = adjustedData.filter(item => item.margin > 0).length;
  const productsAffected = profitableBefore - profitableAfter;

  const productLabel = (count: number) =>
    count === 1 ? messages.common.product : messages.common.products;
  const profitableLabel = (count: number) =>
    count === 1 ? messages.sensitivity.profitableLabelSingular : messages.sensitivity.profitableLabelPlural;

  const formatFactorPercent = (value: number) => {
    const rounded = Math.round(value * 100);
    const sign = rounded > 0 ? '+' : '';
    return `${sign}${formatters.percent(rounded, 0)}`;
  };

  const resetSliders = () => {
    onUpdate(0, 0);
  };

  const minLabel = formatters.percent(Math.round(minFactor * 100), 0);
  const maxLabel = formatters.percent(Math.round(maxFactor * 100), 0);
  const midLabel = formatters.percent(0, 0);
  const productsAffectedLabel =
    productsAffected > 0 ? `${productsAffected} ${productLabel(productsAffected)}` : messages.common.none;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 pb-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900 mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {messages.sensitivity.title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {messages.sensitivity.subtitle}
        </p>
      </div>

      {/* Impact Summary */}
      {(energyFactor !== 0 || customsFactor !== 0) && (
        <div className="mb-5 p-3.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-900">{messages.sensitivity.impactSummary}</span>
            <button
              onClick={resetSliders}
              className="text-xs font-medium text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              {messages.sensitivity.reset}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">{messages.sensitivity.marginChange}</div>
              <div className={`text-sm font-bold ${marginChange >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {formatters.currencySigned(marginChange)}
                <span className="text-sm font-normal text-gray-600 ml-1">({formatters.percent(marginChangePercent, 1)})</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{messages.sensitivity.productsAtRisk}</div>
              <div className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {productsAffectedLabel}
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
              <label htmlFor="energy-slider" className="block text-sm font-semibold text-gray-900 mb-1">
                {messages.sensitivity.energyTitle}
              </label>
              <p id="energy-slider-help" className="text-xs text-gray-600 leading-relaxed">
                {messages.sensitivity.energyHelp}
              </p>
            </div>
            <div className="ml-3 text-right">
              <div className={`text-base font-bold ${energyFactor >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {formatFactorPercent(energyFactor)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {energyFactor === 0
                  ? messages.sensitivity.noChange
                  : energyFactor > 0
                    ? messages.sensitivity.increase
                    : messages.sensitivity.decrease}
              </div>
            </div>
          </div>
          <input
            id="energy-slider"
            type="range"
            min={minFactor}
            max={maxFactor}
            step={FACTOR_STEP}
            value={energyFactor}
            onChange={(e) => onUpdate(parseFloat(e.target.value), customsFactor)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700 transition-colors"
            aria-describedby="energy-slider-help"
            aria-valuetext={formatFactorPercent(energyFactor)}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>{minLabel}</span>
            <span className="text-gray-700 font-semibold">{midLabel}</span>
            <span>{maxLabel}</span>
          </div>
        </div>

        {/* Customs Slider */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <label htmlFor="customs-slider" className="block text-sm font-semibold text-gray-900 mb-1">
                {messages.sensitivity.customsTitle}
              </label>
              <p id="customs-slider-help" className="text-xs text-gray-600 leading-relaxed">
                {messages.sensitivity.customsHelp}
              </p>
            </div>
            <div className="ml-3 text-right">
              <div className={`text-base font-bold ${customsFactor >= 0 ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {formatFactorPercent(customsFactor)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {customsFactor === 0
                  ? messages.sensitivity.noChange
                  : customsFactor > 0
                    ? messages.sensitivity.increase
                    : messages.sensitivity.decrease}
              </div>
            </div>
          </div>
          <input
            id="customs-slider"
            type="range"
            min={minFactor}
            max={maxFactor}
            step={FACTOR_STEP}
            value={customsFactor}
            onChange={(e) => onUpdate(energyFactor, parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700 transition-colors"
            aria-describedby="customs-slider-help"
            aria-valuetext={formatFactorPercent(customsFactor)}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>{minLabel}</span>
            <span className="text-gray-700 font-semibold">{midLabel}</span>
            <span>{maxLabel}</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-3">
        <div className="bg-gray-50 rounded-lg p-3.5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{messages.sensitivity.baselineMargin}</div>
            <div className="text-sm text-gray-500">{profitableBefore} {profitableLabel(profitableBefore)}</div>
          </div>
          <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatters.currency(baselineTotal)}
          </div>
        </div>
        <div className={`rounded-lg p-3.5 border-2 ${marginChange < 0 ? 'bg-red-50 border-red-200' : marginChange > 0 ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{messages.sensitivity.adjustedMargin}</div>
            <div className={`text-sm ${marginChange < 0 ? 'text-red-700' : marginChange > 0 ? 'text-teal-700' : 'text-gray-500'}`}>
              {profitableAfter} {profitableLabel(profitableAfter)}
              {productsAffected > 0 && (
                <span className="font-semibold"> ({productsAffected} {messages.sensitivity.atRiskLabel})</span>
              )}
            </div>
          </div>
          <div className={`text-base font-bold ${marginChange < 0 ? 'text-red-900' : marginChange > 0 ? 'text-teal-900' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatters.currency(adjustedTotal)}
          </div>
          {marginChange !== 0 && (
            <div className={`text-sm mt-1.5 font-medium ${marginChange < 0 ? 'text-red-700' : 'text-teal-700'}`}>
              {formatters.currencySigned(marginChange)} ({formatters.percent(marginChangePercent, 1)})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
