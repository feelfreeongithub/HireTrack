// A small tooltip that also looks right in dark mode
export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-md dark:border-slate-700 dark:bg-slate-800">
      <p className="font-medium">{label}</p>
      <p className="text-slate-600 dark:text-slate-300">
        {payload[0].value} {payload[0].value === 1 ? "job" : "jobs"}
      </p>
    </div>
  );
}
