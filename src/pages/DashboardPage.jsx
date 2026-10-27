import { useMemo } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import StatusChart from "../components/dashboard/StatusChart";
import {
  getStats,
  getStatusCounts,
  getWeeklyApplications,
} from "../utils/stats";
import { useJobs } from "../context/useJobs";

export default function DashboardPage() {
  const { jobs } = useJobs();

  // Recalculate only when jobs change
  const stats = useMemo(() => getStats(jobs), [jobs]);
  const statusCounts = useMemo(() => getStatusCounts(jobs), [jobs]);
  const weekly = useMemo(() => getWeeklyApplications(jobs), [jobs]);

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
        <h1 className="text-lg font-semibold">No data yet</h1>
        <p className="mt-1 text-sm text-slate-500">
          Add your first job on the board to see your stats here.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go to board
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="mb-4 text-sm text-slate-500">
        How your job search is going
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Applied"
          value={stats.applied}
          hint="Excludes wishlist"
        />
        <StatCard label="Interviews" value={stats.interviews} />
        <StatCard label="Offers" value={stats.offers} />
        <StatCard
          label="Response rate"
          value={`${stats.responseRate}%`}
          hint="Interview, offer or rejection"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyChart data={weekly} />
        <StatusChart data={statusCounts} />
      </div>
    </div>
  );
}
