import { useJobs } from "../context/JobsContext";
import { STATUSES } from "../utils/constants";

export default function BoardPage() {
  const { jobs } = useJobs();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Board</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STATUSES.map((status) => (
          <div
            key={status.id}
            className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={`h-2 w-2 rounded-full ${status.dot}`} />
              {status.label}
            </div>
            <p className="mt-2 text-2xl font-bold">
              {jobs.filter((job) => job.status === status.id).length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
