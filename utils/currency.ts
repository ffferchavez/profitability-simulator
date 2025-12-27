export type CurrencyCode = 'EUR' | 'USD';

export const CURRENCIES: CurrencyCode[] = ['EUR', 'USD'];
export const DEFAULT_CURRENCY: CurrencyCode = 'EUR';

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
};

export function getCurrency(value?: string | string[] | null): CurrencyCode {
  if (!value) return DEFAULT_CURRENCY;
  const candidate = Array.isArray(value) ? value[0] : value;
  const normalized = (candidate ?? '').toUpperCase();
  if (CURRENCIES.includes(normalized as CurrencyCode)) {
    return normalized as CurrencyCode;
  }
  return DEFAULT_CURRENCY;
}

export function getExchangeRate(currency: CurrencyCode): number {
  return EXCHANGE_RATES[currency] ?? 1;
}
