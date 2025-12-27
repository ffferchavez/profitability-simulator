'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Locale, Messages } from '@/utils/i18n';
import type { Formatters } from '@/utils/format';

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  formatters: Formatters;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  locale: Locale;
  messages: Messages;
  formatters: Formatters;
  children: ReactNode;
}

export function I18nProvider({ locale, messages, formatters, children }: I18nProviderProps) {
  return (
    <I18nContext.Provider value={{ locale, messages, formatters }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider.');
  }
  return context;
}
