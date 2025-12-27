'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CompetitorRisk, Product, calculateAdjustedContributionMargin, calculateContributionMargin, clampFactor, FACTOR_RANGE } from '@/utils/calculations';
import { createFormatters } from '@/utils/format';
import { downloadCsv } from '@/utils/exportCsv';
import ProfitabilityChart from '@/components/ProfitabilityChart';
import CostDriverChart from '@/components/CostDriverChart';
import SensitivitySlider from '@/components/SensitivitySlider';
import RiskMatrix from '@/components/RiskMatrix';
import { I18nProvider } from '@/components/I18nProvider';
import { DEFAULT_LOCALE, LOCALES, Locale, getLocale, getMessages } from '@/utils/i18n';
import { CURRENCIES, DEFAULT_CURRENCY, CurrencyCode, getCurrency, getExchangeRate } from '@/utils/currency';

interface DashboardClientProps {
  products: Product[];
  risk: CompetitorRisk[];
  initialEnergyFactor: number;
  initialCustomsFactor: number;
  initialLocale: Locale;
  initialCurrency: CurrencyCode;
  dataIssues?: {
    products: number;
    risk: number;
  };
}

export default function DashboardClient({
  products,
  risk,
  initialEnergyFactor,
  initialCustomsFactor,
  initialLocale,
  initialCurrency,
  dataIssues,
}: DashboardClientProps) {
  const [energyFactor, setEnergyFactor] = useState(clampFactor(initialEnergyFactor));
  const [customsFactor, setCustomsFactor] = useState(clampFactor(initialCustomsFactor));
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const messages = useMemo(() => getMessages(locale), [locale]);
  const exchangeRate = useMemo(() => getExchangeRate(currency), [currency]);
  const formatters = useMemo(
    () => createFormatters(locale, currency, exchangeRate),
    [currency, exchangeRate, locale]
  );

  useEffect(() => {
    if (!searchParams) return;
    const hasParams = searchParams.has('energy') || searchParams.has('customs');
    if (hasParams) return;
    const stored = localStorage.getItem('profitability-sensitivity');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { energyFactor?: number; customsFactor?: number };
      const nextEnergy = clampFactor(Number(parsed.energyFactor ?? 0));
      const nextCustoms = clampFactor(Number(parsed.customsFactor ?? 0));
      setEnergyFactor(nextEnergy);
      setCustomsFactor(nextCustoms);
    } catch {
      // Ignore malformed localStorage values.
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem(
      'profitability-sensitivity',
      JSON.stringify({ energyFactor, customsFactor })
    );
  }, [energyFactor, customsFactor]);

  useEffect(() => {
    if (!searchParams) return;
    const hasLang = searchParams.has('lang');
    if (hasLang) return;
    const stored = localStorage.getItem('profitability-locale');
    if (!stored) return;
    setLocale(getLocale(stored));
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams) return;
    const hasCurrency = searchParams.has('currency');
    if (hasCurrency) return;
    const stored = localStorage.getItem('profitability-currency');
    if (!stored) return;
    setCurrency(getCurrency(stored));
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('profitability-locale', locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('profitability-currency', currency);
  }, [currency]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (energyFactor !== 0) {
      params.set('energy', energyFactor.toString());
    } else {
      params.delete('energy');
    }
    if (customsFactor !== 0) {
      params.set('customs', customsFactor.toString());
    } else {
      params.delete('customs');
    }
    if (locale !== DEFAULT_LOCALE) {
      params.set('lang', locale);
    } else {
      params.delete('lang');
    }
    if (currency !== DEFAULT_CURRENCY) {
      params.set('currency', currency);
    } else {
      params.delete('currency');
    }
    const nextQuery = params.toString();
    const currentQuery = searchParams?.toString() ?? '';
    if (nextQuery !== currentQuery) {
      router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ''}`, { scroll: false });
    }
  }, [customsFactor, currency, energyFactor, locale, pathname, router, searchParams]);

  const totals = useMemo(() => {
    const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
    const totalMargin = products.reduce((sum, p) => sum + calculateContributionMargin(p), 0);
    const marginPercentage = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
    return { totalRevenue, totalMargin, marginPercentage };
  }, [products]);

  const handleSensitivityUpdate = (nextEnergy: number, nextCustoms: number) => {
    setEnergyFactor(clampFactor(nextEnergy));
    setCustomsFactor(clampFactor(nextCustoms));
  };

  const handleLocaleChange = (nextLocale: string) => {
    setLocale(getLocale(nextLocale));
  };

  const handleCurrencyChange = (nextCurrency: string) => {
    setCurrency(getCurrency(nextCurrency));
  };

  const handleExport = () => {
    if (products.length === 0) return;
    const rows = products.map((product) => {
      const baseline = Math.round(calculateContributionMargin(product));
      const adjusted = Math.round(
        calculateAdjustedContributionMargin(product, energyFactor, customsFactor)
      );
      return {
        product: product.product,
        baseline_margin: Math.round(formatters.convert(baseline)),
        adjusted_margin: Math.round(formatters.convert(adjusted)),
        energy_factor: energyFactor,
        customs_factor: customsFactor,
        currency,
      };
    });
    downloadCsv('profitability-scenario.csv', rows);
  };

  const showDataNotice = Boolean(dataIssues?.products || dataIssues?.risk);
  const productRowLabel = (count: number) =>
    count === 1 ? messages.dataNotice.productRow : messages.dataNotice.productRows;
  const riskRowLabel = (count: number) =>
    count === 1 ? messages.dataNotice.riskRow : messages.dataNotice.riskRows;

  return (
    <I18nProvider locale={locale} messages={messages} formatters={formatters}>
      <div className="min-h-screen bg-gray-50">
        <div className="min-h-screen flex flex-col lg:flex-row">
          <div className="flex-1 min-w-0 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
              <div className="w-full px-6 sm:px-8 lg:px-12 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {messages.header.title}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {messages.header.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExport}
                      className="text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                      aria-label={messages.header.exportCsv}
                      disabled={products.length === 0}
                    >
                      {messages.header.exportCsv}
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
                      <label className="text-sm font-medium text-gray-600 uppercase tracking-wide" htmlFor="language-select">
                        {messages.header.languageLabel}
                      </label>
                      <select
                        id="language-select"
                        value={locale}
                        onChange={(event) => handleLocaleChange(event.target.value)}
                        className="text-sm font-semibold text-gray-700 bg-transparent focus:outline-none"
                        aria-label={messages.header.languageLabel}
                      >
                        {LOCALES.map((option) => (
                          <option key={option} value={option}>
                            {messages.languageNames[option]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
                      <label className="text-sm font-medium text-gray-600 uppercase tracking-wide" htmlFor="currency-select">
                        {messages.header.currencyLabel}
                      </label>
                      <select
                        id="currency-select"
                        value={currency}
                        onChange={(event) => handleCurrencyChange(event.target.value)}
                        className="text-sm font-semibold text-gray-700 bg-transparent focus:outline-none"
                        aria-label={messages.header.currencyLabel}
                      >
                        {CURRENCIES.map((option) => (
                          <option key={option} value={option}>
                            {messages.currencyNames[option]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {showDataNotice && (
                  <div className="mb-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-md">
                    {messages.dataNotice.prefix} {dataIssues?.products ?? 0} {productRowLabel(dataIssues?.products ?? 0)} {messages.dataNotice.and}{' '}
                    {dataIssues?.risk ?? 0} {riskRowLabel(dataIssues?.risk ?? 0)} {messages.dataNotice.suffix}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-teal-500 rounded-full"></div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">{messages.metrics.totalRevenue}</div>
                      <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {formatters.currency(totals.totalRevenue)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full ${totals.totalMargin >= 0 ? 'bg-teal-500' : 'bg-gray-400'}`}></div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">{messages.metrics.totalMargin}</div>
                      <div className={`text-lg font-bold ${totals.totalMargin >= 0 ? 'text-teal-600' : 'text-gray-600'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {formatters.currency(totals.totalMargin)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">{messages.metrics.marginPercent}</div>
                      <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {formatters.percent(totals.marginPercentage, 1)}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="w-1 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-0.5">{messages.metrics.products}</div>
                      <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {products.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 px-6 sm:px-8 lg:px-12 py-5">
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

          <aside className="w-full lg:w-80 xl:w-[22rem] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto shadow-sm">
            <div className="p-5">
              <SensitivitySlider
                products={products}
                energyFactor={energyFactor}
                customsFactor={customsFactor}
                minFactor={FACTOR_RANGE.min}
                maxFactor={FACTOR_RANGE.max}
                onUpdate={handleSensitivityUpdate}
              />
            </div>
          </aside>
        </div>
      </div>
    </I18nProvider>
  );
}
