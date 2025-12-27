const numberFormatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatEuro(value: number): string {
  const sign = value < 0 ? '-' : '';
  return `${sign}€${numberFormatter.format(Math.abs(value))}`;
}

export function formatEuroSigned(value: number): string {
  if (value === 0) return `€${numberFormatter.format(0)}`;
  const sign = value > 0 ? '+' : '-';
  return `${sign}€${numberFormatter.format(Math.abs(value))}`;
}

export function formatEuroCompactK(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1_000_000) {
    return `${sign}€${(abs / 1_000_000).toFixed(0)}m`;
  }
  if (abs >= 1_000) {
    return `${sign}€${(abs / 1_000).toFixed(0)}k`;
  }
  return formatEuro(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}
