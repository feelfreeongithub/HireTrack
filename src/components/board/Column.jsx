import { useDroppable } from "@dnd-kit/core";
import JobCard from "./JobCard";

export default function Column({ status, jobs, onEdit }) {
  // The column's id is the status, so on drop we know the new status
  const { setNodeRef, isOver } = useDroppable({ id: status.id });

  return (
    <section
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-xl p-3 transition-colors lg:w-auto lg:flex-1 ${
        isOver
          ? "bg-blue-50 ring-2 ring-blue-400 dark:bg-slate-800"
          : "bg-slate-100 dark:bg-slate-900"
      }`}
    >
      <header className="mb-3 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
        <h2 className="text-sm font-semibold">{status.label}</h2>
        <span className="ml-auto rounded-full bg-white px-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {jobs.length}
        </span>
      </header>

      <div className="flex min-h-24 flex-col gap-2">
        {jobs.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500 dark:border-slate-700">
            Drop a job here
          </p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} onEdit={onEdit} />)
        )}
      </div>
    </section>
  );
}
