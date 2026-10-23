import { useState } from "react";
import Board from "../components/board/Board";
import JobFormModal from "../components/job/JobFormModal";
import { useJobs } from "../context/JobsContext";

export default function BoardPage() {
  const { jobs } = useJobs();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  function openAddForm() {
    setEditingJob(null);
    setIsFormOpen(true);
  }

  function openEditForm(job) {
    setEditingJob(job);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingJob(null);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Board</h1>
          <p className="text-sm text-slate-500">{jobs.length} jobs tracked</p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add job
        </button>
      </div>

      <Board jobs={jobs} onEdit={openEditForm} />

      {/* key makes React create a fresh form each time it opens */}
      {isFormOpen && (
        <JobFormModal
          key={editingJob?.id ?? "new"}
          job={editingJob}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
