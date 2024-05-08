export function SmallProfilePulse() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2" />
              <div className="h-2 bg-slate-700 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartPulse() {
  return (
    <div
  role="status"
  className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
>
  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5" />
  <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700" />
  <div className="flex items-baseline mt-4">
    <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
    {[56,32,64,56,32,56,32,56,28,32,64,56,32].map((h:any)=>{
      return(<div className={`w-full h-${h} ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700`} />)
    })}
  </div>
  <span className="sr-only">Loading...</span>
</div>

  );
}
