import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

export default function WeeklyChart({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-semibold">Applications per week</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Last 8 weeks
      </p>
      {/* text-slate-500 colours the axis labels through currentColor */}
      <div className="h-64 text-slate-500 dark:text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              strokeOpacity={0.15}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "currentColor", fillOpacity: 0.08 }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
