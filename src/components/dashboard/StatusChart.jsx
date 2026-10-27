import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

export default function StatusChart({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-semibold">Jobs by status</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Where every application stands
      </p>
      <div className="h-64 text-slate-500 dark:text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
          >
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={72}
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "currentColor", fillOpacity: 0.08 }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
