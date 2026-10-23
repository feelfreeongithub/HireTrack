import Badge from "../ui/Badge";
import { useJobs } from "../../context/JobsContext";
import { daysSince } from "../../utils/dates";

export default function JobCard({ job, onEdit }) {
  const { dispatch } = useJobs();
  const days = daysSince(job.appliedOn);

  function handleDelete() {
    if (window.confirm(`Delete ${job.role} at ${job.company}?`)) {
      dispatch({ type: "DELETE_JOB", payload: job.id });
    }
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="font-semibold leading-tight">{job.company}</h3>
      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
        {job.role}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge>{job.platform}</Badge>
        <Badge>{job.workType}</Badge>
        {job.salary && <Badge>{job.salary}</Badge>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {days === null
            ? "Not applied yet"
            : days === 0
              ? "Applied today"
              : `Applied ${days}d ago`}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-slate-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
