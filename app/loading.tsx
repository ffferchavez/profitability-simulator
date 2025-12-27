export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 sm:px-8 lg:px-12 py-4">
              <div className="animate-pulse space-y-3">
                <div className="h-5 w-56 bg-gray-200 rounded"></div>
                <div className="h-3 w-80 bg-gray-100 rounded"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 sm:px-8 lg:px-12 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-80 bg-white border border-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-80 bg-white border border-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-72 lg:col-span-2 bg-white border border-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <aside className="w-full lg:w-80 xl:w-[22rem] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shadow-sm">
          <div className="p-5">
            <div className="h-[520px] bg-gray-50 border border-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
