'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_LOCALE, getLocale, getMessages } from '@/utils/i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const messages = getMessages(locale);

  useEffect(() => {
    console.error('Dashboard failed to load:', error);
  }, [error]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    setLocale(getLocale(document.documentElement.lang || navigator.language));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
        <h1 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {messages.error.title}
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          {messages.error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md transition-colors"
        >
          {messages.error.retry}
        </button>
      </div>
    </div>
  );
}
