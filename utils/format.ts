import type { CurrencyCode } from '@/utils/currency';

export interface Formatters {
  convert: (value: number) => number;
  currency: (value: number) => string;
  currencySigned: (value: number) => string;
  currencyCompact: (value: number) => string;
  percent: (value: number, digits?: number) => string;
}

export function createFormatters(
  locale: string,
  currency: CurrencyCode,
  rate: number
): Formatters {
  const percentFormatter0 = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const percentFormatter1 = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const currencyCompactFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  const convert = (value: number) => value * rate;

  const formatCurrency = (value: number) => currencyFormatter.format(convert(value));

  const formatCurrencySigned = (value: number) => {
    if (value === 0) return formatCurrency(0);
    const sign = value > 0 ? '+' : '-';
    return `${sign}${currencyFormatter.format(Math.abs(convert(value)))}`;
  };

  const formatCurrencyCompact = (value: number) => {
    const abs = Math.abs(convert(value));
    const sign = value < 0 ? '-' : '';
    if (abs >= 1_000) {
      return `${sign}${currencyCompactFormatter.format(abs)}`;
    }
    return formatCurrency(value);
  };

  const formatPercent = (value: number, digits = 1) => {
    if (digits === 0) {
      return `${percentFormatter0.format(value)}%`;
    }
    if (digits === 1) {
      return `${percentFormatter1.format(value)}%`;
    }
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    return `${formatter.format(value)}%`;
  };

  return {
    convert,
    currency: formatCurrency,
    currencySigned: formatCurrencySigned,
    currencyCompact: formatCurrencyCompact,
    percent: formatPercent,
  };
}
