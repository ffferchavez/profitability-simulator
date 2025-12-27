export type Locale = 'en' | 'de' | 'es';

export const LOCALES: Locale[] = ['en', 'de', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';

export interface Messages {
  header: {
    title: string;
    subtitle: string;
    exportCsv: string;
    currencyLabel: string;
    languageLabel: string;
    logout: string;
  };
  metrics: {
    totalRevenue: string;
    totalMargin: string;
    marginPercent: string;
    products: string;
  };
  dataNotice: {
    prefix: string;
    and: string;
    productRow: string;
    productRows: string;
    riskRow: string;
    riskRows: string;
    suffix: string;
  };
  profitability: {
    title: string;
    subtitle: string;
    totalMargin: string;
    profitable: string;
    lossMaking: string;
    noData: string;
    tooltipLabel: string;
    legendProfitable: string;
    legendLossMaking: string;
  };
  cost: {
    title: string;
    subtitle: string;
    totalCosts: string;
    noData: string;
    labels: {
      material: string;
      energy: string;
      customs: string;
      labor: string;
      other: string;
    };
  };
  sensitivity: {
    title: string;
    subtitle: string;
    impactSummary: string;
    reset: string;
    marginChange: string;
    productsAtRisk: string;
    energyTitle: string;
    energyHelp: string;
    customsTitle: string;
    customsHelp: string;
    noChange: string;
    increase: string;
    decrease: string;
    baselineMargin: string;
    adjustedMargin: string;
    profitableLabelSingular: string;
    profitableLabelPlural: string;
    atRiskLabel: string;
  };
  risk: {
    title: string;
    subtitle: string;
    highRisk: string;
    mediumRisk: string;
    lowRisk: string;
    riskScore: string;
    presence: string;
    labelHigh: string;
    labelMedium: string;
    labelLow: string;
    legendLow: string;
    legendMedium: string;
    legendHigh: string;
    presenceHigh: string;
    presenceMedium: string;
    presenceLow: string;
    noData: string;
  };
  common: {
    product: string;
    products: string;
    none: string;
  };
  languageNames: {
    en: string;
    de: string;
    es: string;
  };
  currencyNames: {
    EUR: string;
    USD: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
}

const MESSAGES: Record<Locale, Messages> = {
  en: {
    header: {
      title: 'Profitability Cockpit',
      subtitle: 'Real-time visibility into product profitability, cost drivers, and competitive risk',
      exportCsv: 'Export CSV',
      currencyLabel: 'Currency',
      languageLabel: 'Language',
      logout: 'Log out',
    },
    metrics: {
      totalRevenue: 'Total Revenue',
      totalMargin: 'Total Margin',
      marginPercent: 'Margin %',
      products: 'Products',
    },
    dataNotice: {
      prefix: 'Data validation skipped',
      and: 'and',
      productRow: 'product row',
      productRows: 'product rows',
      riskRow: 'risk row',
      riskRows: 'risk rows',
      suffix: 'due to missing or invalid values.',
    },
    profitability: {
      title: 'Profitability Overview',
      subtitle: 'Contribution margin per product',
      totalMargin: 'Total Margin',
      profitable: 'Profitable',
      lossMaking: 'Loss-making',
      noData: 'No product data available.',
      tooltipLabel: 'Contribution Margin',
      legendProfitable: 'Profitable',
      legendLossMaking: 'Loss-making',
    },
    cost: {
      title: 'Cost Driver Breakdown',
      subtitle: 'Cost components per product',
      totalCosts: 'Total Costs',
      noData: 'No cost data available.',
      labels: {
        material: 'Material Cost',
        energy: 'Energy Cost',
        customs: 'Customs',
        labor: 'Labor',
        other: 'Other Costs',
      },
    },
    sensitivity: {
      title: 'Sensitivity Simulation',
      subtitle: 'Adjust sliders to see real-time impact on profitability charts.',
      impactSummary: 'Impact Summary',
      reset: 'Reset',
      marginChange: 'Margin Change',
      productsAtRisk: 'Products at Risk',
      energyTitle: 'Energy Cost Impact',
      energyHelp: 'Simulate changes in energy prices. +50% = 1.5x higher costs.',
      customsTitle: 'Customs & Import Fees',
      customsHelp: 'Simulate changes in customs duties. +30% = 1.3x higher fees.',
      noChange: 'No change',
      increase: 'Increase',
      decrease: 'Decrease',
      baselineMargin: 'Baseline Margin',
      adjustedMargin: 'Adjusted Margin',
      profitableLabelSingular: 'profitable',
      profitableLabelPlural: 'profitable',
      atRiskLabel: 'at risk',
    },
    risk: {
      title: 'Competitor Risk Indicators',
      subtitle: 'Chinese competitor pressure assessment',
      highRisk: 'High Risk',
      mediumRisk: 'Medium Risk',
      lowRisk: 'Low Risk',
      riskScore: 'Risk Score',
      presence: 'Presence',
      labelHigh: 'High Risk',
      labelMedium: 'Medium Risk',
      labelLow: 'Low Risk',
      legendLow: 'Low (<0.4)',
      legendMedium: 'Medium (0.4-0.69)',
      legendHigh: 'High (≥0.7)',
      presenceHigh: 'High',
      presenceMedium: 'Medium',
      presenceLow: 'Low',
      noData: 'No risk data available.',
    },
    common: {
      product: 'product',
      products: 'products',
      none: 'None',
    },
    languageNames: {
      en: 'English',
      de: 'Deutsch',
      es: 'Español',
    },
    currencyNames: {
      EUR: 'Euro (EUR)',
      USD: 'US Dollar (USD)',
    },
    error: {
      title: 'Something went wrong',
      message: 'We could not load the dashboard data. Please try again or refresh the page.',
      retry: 'Retry',
    },
  },
  de: {
    header: {
      title: 'Profitabilitäts-Cockpit',
      subtitle: 'Echtzeit-Einblick in Produktmargen, Kostentreiber und Wettbewerbsrisiken',
      exportCsv: 'CSV exportieren',
      currencyLabel: 'Währung',
      languageLabel: 'Sprache',
      logout: 'Abmelden',
    },
    metrics: {
      totalRevenue: 'Gesamtumsatz',
      totalMargin: 'Gesamtmarge',
      marginPercent: 'Marge %',
      products: 'Produkte',
    },
    dataNotice: {
      prefix: 'Datenvalidierung hat',
      and: 'und',
      productRow: 'Produktzeile',
      productRows: 'Produktzeilen',
      riskRow: 'Risikozeile',
      riskRows: 'Risikozeilen',
      suffix: 'wegen fehlender oder ungültiger Werte übersprungen.',
    },
    profitability: {
      title: 'Profitabilitätsübersicht',
      subtitle: 'Deckungsbeitrag pro Produkt',
      totalMargin: 'Gesamtmarge',
      profitable: 'Profitabel',
      lossMaking: 'Verlustbringend',
      noData: 'Keine Produktdaten verfügbar.',
      tooltipLabel: 'Deckungsbeitrag',
      legendProfitable: 'Profitabel',
      legendLossMaking: 'Verlustbringend',
    },
    cost: {
      title: 'Kostenstruktur',
      subtitle: 'Kostenkomponenten pro Produkt',
      totalCosts: 'Gesamtkosten',
      noData: 'Keine Kostendaten verfügbar.',
      labels: {
        material: 'Materialkosten',
        energy: 'Energiekosten',
        customs: 'Zoll',
        labor: 'Personal',
        other: 'Sonstige Kosten',
      },
    },
    sensitivity: {
      title: 'Sensitivitätssimulation',
      subtitle: 'Passen Sie die Regler an, um die Auswirkungen in Echtzeit zu sehen.',
      impactSummary: 'Auswirkungsübersicht',
      reset: 'Zurücksetzen',
      marginChange: 'Margeänderung',
      productsAtRisk: 'Produkte gefährdet',
      energyTitle: 'Energiekosten-Einfluss',
      energyHelp: 'Simulieren Sie Änderungen der Energiepreise. +50% = 1,5x höhere Kosten.',
      customsTitle: 'Zoll- & Importgebühren',
      customsHelp: 'Simulieren Sie Änderungen der Zollgebühren. +30% = 1,3x höhere Gebühren.',
      noChange: 'Keine Änderung',
      increase: 'Anstieg',
      decrease: 'Rückgang',
      baselineMargin: 'Basismarge',
      adjustedMargin: 'Angepasste Marge',
      profitableLabelSingular: 'profitabel',
      profitableLabelPlural: 'profitabel',
      atRiskLabel: 'gefährdet',
    },
    risk: {
      title: 'Wettbewerbsrisiko-Indikatoren',
      subtitle: 'Bewertung des chinesischen Wettbewerbsdrucks',
      highRisk: 'Hohes Risiko',
      mediumRisk: 'Mittleres Risiko',
      lowRisk: 'Niedriges Risiko',
      riskScore: 'Risikowert',
      presence: 'Präsenz',
      labelHigh: 'Hohes Risiko',
      labelMedium: 'Mittleres Risiko',
      labelLow: 'Niedriges Risiko',
      legendLow: 'Niedrig (<0,4)',
      legendMedium: 'Mittel (0,4-0,69)',
      legendHigh: 'Hoch (≥0,7)',
      presenceHigh: 'Hoch',
      presenceMedium: 'Mittel',
      presenceLow: 'Niedrig',
      noData: 'Keine Risikodaten verfügbar.',
    },
    common: {
      product: 'Produkt',
      products: 'Produkte',
      none: 'Keine',
    },
    languageNames: {
      en: 'Englisch',
      de: 'Deutsch',
      es: 'Spanisch',
    },
    currencyNames: {
      EUR: 'Euro (EUR)',
      USD: 'US-Dollar (USD)',
    },
    error: {
      title: 'Etwas ist schiefgelaufen',
      message: 'Wir konnten die Dashboard-Daten nicht laden. Bitte versuchen Sie es erneut oder laden Sie die Seite neu.',
      retry: 'Erneut versuchen',
    },
  },
  es: {
    header: {
      title: 'Panel de rentabilidad',
      subtitle: 'Visibilidad en tiempo real de la rentabilidad, los costos y el riesgo competitivo',
      exportCsv: 'Exportar CSV',
      currencyLabel: 'Moneda',
      languageLabel: 'Idioma',
      logout: 'Cerrar sesión',
    },
    metrics: {
      totalRevenue: 'Ingresos totales',
      totalMargin: 'Margen total',
      marginPercent: 'Margen %',
      products: 'Productos',
    },
    dataNotice: {
      prefix: 'La validación de datos omitió',
      and: 'y',
      productRow: 'fila de producto',
      productRows: 'filas de producto',
      riskRow: 'fila de riesgo',
      riskRows: 'filas de riesgo',
      suffix: 'por valores faltantes o inválidos.',
    },
    profitability: {
      title: 'Resumen de rentabilidad',
      subtitle: 'Margen de contribución por producto',
      totalMargin: 'Margen total',
      profitable: 'Rentable',
      lossMaking: 'Con pérdidas',
      noData: 'No hay datos de productos.',
      tooltipLabel: 'Margen de contribución',
      legendProfitable: 'Rentable',
      legendLossMaking: 'Con pérdidas',
    },
    cost: {
      title: 'Desglose de costos',
      subtitle: 'Componentes de costo por producto',
      totalCosts: 'Costos totales',
      noData: 'No hay datos de costos.',
      labels: {
        material: 'Costo de material',
        energy: 'Costo de energía',
        customs: 'Aduanas',
        labor: 'Mano de obra',
        other: 'Otros costos',
      },
    },
    sensitivity: {
      title: 'Simulación de sensibilidad',
      subtitle: 'Ajusta los controles para ver el impacto en tiempo real en la rentabilidad.',
      impactSummary: 'Resumen de impacto',
      reset: 'Restablecer',
      marginChange: 'Cambio de margen',
      productsAtRisk: 'Productos en riesgo',
      energyTitle: 'Impacto del costo de energía',
      energyHelp: 'Simula cambios en los precios de la energía. +50% = 1,5x costos más altos.',
      customsTitle: 'Aranceles e importaciones',
      customsHelp: 'Simula cambios en los aranceles. +30% = 1,3x tasas más altas.',
      noChange: 'Sin cambio',
      increase: 'Aumento',
      decrease: 'Disminución',
      baselineMargin: 'Margen base',
      adjustedMargin: 'Margen ajustado',
      profitableLabelSingular: 'rentable',
      profitableLabelPlural: 'rentables',
      atRiskLabel: 'en riesgo',
    },
    risk: {
      title: 'Indicadores de riesgo competitivo',
      subtitle: 'Evaluación de la presión competitiva china',
      highRisk: 'Riesgo alto',
      mediumRisk: 'Riesgo medio',
      lowRisk: 'Riesgo bajo',
      riskScore: 'Puntaje de riesgo',
      presence: 'Presencia',
      labelHigh: 'Riesgo alto',
      labelMedium: 'Riesgo medio',
      labelLow: 'Riesgo bajo',
      legendLow: 'Bajo (<0,4)',
      legendMedium: 'Medio (0,4-0,69)',
      legendHigh: 'Alto (≥0,7)',
      presenceHigh: 'Alta',
      presenceMedium: 'Media',
      presenceLow: 'Baja',
      noData: 'No hay datos de riesgo.',
    },
    common: {
      product: 'producto',
      products: 'productos',
      none: 'Ninguno',
    },
    languageNames: {
      en: 'Inglés',
      de: 'Alemán',
      es: 'Español',
    },
    currencyNames: {
      EUR: 'Euro (EUR)',
      USD: 'Dólar estadounidense (USD)',
    },
    error: {
      title: 'Algo salió mal',
      message: 'No pudimos cargar los datos del panel. Inténtalo de nuevo o actualiza la página.',
      retry: 'Reintentar',
    },
  },
};

export function getLocale(value?: string | string[] | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return DEFAULT_LOCALE;
  const normalized = candidate.toLowerCase().slice(0, 2);
  if (LOCALES.includes(normalized as Locale)) {
    return normalized as Locale;
  }
  return DEFAULT_LOCALE;
}

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}
