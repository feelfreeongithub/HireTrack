import { useDraggable } from "@dnd-kit/core";
import Badge from "../ui/Badge";
import { daysSince, isFollowUpDue } from "../../utils/dates";
import { useJobs } from "../../context/useJobs";

// The draggable card that sits in a column
export default function JobCard({ job, onEdit, onOpen }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: job.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-label={`${job.role} at ${job.company}. Press space to pick up and move.`}
      className={`cursor-grab rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <JobCardContent job={job} onEdit={onEdit} onOpen={onOpen} />
    </div>
  );
}

// The card's look. Also used for the floating copy while dragging.
export function JobCardContent({ job, onEdit, onOpen, isOverlay = false }) {
  const { dispatch } = useJobs();
  const days = daysSince(job.appliedOn);

  function handleDelete() {
    if (window.confirm(`Delete ${job.role} at ${job.company}?`)) {
      dispatch({ type: "DELETE_JOB", payload: job.id });
    }
  }

  // Stop key presses on the buttons from starting a keyboard drag
  const stopKeys = (event) => event.stopPropagation();

  return (
    <article
      className={`rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 ${
        isOverlay ? "rotate-2 shadow-xl" : "shadow-sm"
      }`}
    >
      <h3 className="font-semibold leading-tight">
        {isOverlay ? (
          job.company
        ) : (
          <button
            type="button"
            onClick={() => onOpen(job)}
            onKeyDown={stopKeys}
            className="text-left hover:text-blue-600 hover:underline"
          >
            {job.company}
          </button>
        )}
      </h3>
      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
        {job.role}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge>{job.platform}</Badge>
        <Badge>{job.workType}</Badge>
        {job.salary && <Badge>{job.salary}</Badge>}
        {isFollowUpDue(job) && <Badge tone="danger">Follow up</Badge>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {days === null
            ? "Not applied yet"
            : days === 0
              ? "Applied today"
              : `Applied ${days}d ago`}
        </span>
        {!isOverlay && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onEdit(job)}
              onKeyDown={stopKeys}
              className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              onKeyDown={stopKeys}
              className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-slate-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
