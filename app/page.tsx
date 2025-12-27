import Link from 'next/link';

type SearchParams = {
  lang?: string | string[];
  currency?: string | string[];
};

function getParam(value?: string | string[]) {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default function LoginPage({ searchParams }: { searchParams?: SearchParams }) {
  const lang = getParam(searchParams?.lang);
  const currency = getParam(searchParams?.currency);
  const params = new URLSearchParams();
  if (lang) params.set('lang', lang);
  if (currency) params.set('currency', currency);
  const demoHref = `/dashboard${params.toString() ? `?${params.toString()}` : ''}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-amber-50">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-teal-200/60 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.12),transparent_55%)]"></div>

      <main className="relative z-10 grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
            Manufacturing intelligence
          </div>
          <h1 className="mt-5 text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-6xl">
            Profitability Cockpit
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            A decision cockpit built for fast margin clarity, resilient cost control, and competitive risk awareness.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Margin signal</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">Live insights</div>
              <p className="mt-2 text-sm text-slate-600">
                Track contribution margin by product with real-time adjustments.
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scenario modeling</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">Instant what-ifs</div>
              <p className="mt-2 text-sm text-slate-600">
                Quantify energy or customs changes in seconds.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-teal-600"></span>
              <span>Purpose-built metrics for finance and operations leaders.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-teal-600"></span>
              <span>Localized UI with multi-currency support and shareable scenarios.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-teal-600"></span>
              <span>Mock data with production-ready UX patterns.</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
                <p className="mt-1 text-sm text-slate-500">Use the demo button to explore the dashboard.</p>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-200" />
                  Remember me
                </label>
                <span className="text-slate-400">Forgot password</span>
              </div>
            </form>

            <div className="mt-6 space-y-3">
              <Link
                href={demoHref}
                className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-teal-700"
              >
                Demo Login
              </Link>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500"
                disabled
              >
                Sign in
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
              Demo mode uses mock data for showcasing purposes.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
