import { useEffect } from "react";
import Badge from "../ui/Badge";
import { STATUSES } from "../../utils/constants";
import { isFollowUpDue } from "../../utils/dates";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  );
}

export default function JobDrawer({ job, onClose, onEdit }) {
  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const status = STATUSES.find((s) => s.id === job.status);

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-black/40"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onClick={(event) => event.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-xl dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="drawer-title" className="text-xl font-semibold">
              {job.company}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">{job.role}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <span className={`h-2.5 w-2.5 rounded-full ${status?.dot}`} />
            {status?.label}
          </span>
          {isFollowUpDue(job) && <Badge tone="danger">Follow up due</Badge>}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4">
          <Detail label="Platform">{job.platform}</Detail>
          <Detail label="Work type">{job.workType}</Detail>
          <Detail label="Salary">{job.salary || "—"}</Detail>
          <Detail label="Applied on">{formatDate(job.appliedOn)}</Detail>
          <Detail label="Follow up on">{formatDate(job.followUpOn)}</Detail>
          <Detail label="Job link">
            {job.link ? (
              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open posting ↗
              </a>
            ) : (
              "—"
            )}
          </Detail>
        </dl>

        <div className="mt-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Notes
          </h3>
          <p className="mt-1 whitespace-pre-wrap text-sm">
            {job.notes || "No notes yet."}
          </p>
        </div>

        <div className="mt-auto flex justify-end gap-2 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit job
          </button>
        </div>
      </aside>
    </div>
  );
}
