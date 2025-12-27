'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard failed to load:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
        <h1 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Something went wrong
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          We could not load the dashboard data. Please try again or refresh the page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
