import { useState } from "react";
import Board from "../components/board/Board";
import FilterBar from "../components/board/FilterBar";
import JobFormModal from "../components/job/JobFormModal";
import JobDrawer from "../components/job/JobDrawer";
import { useFilteredJobs } from "../hooks/useFilteredJobs";
import { DEFAULT_FILTERS } from "../utils/constants";
import { useJobs } from "../context/useJobs";

export default function BoardPage() {
  const { jobs } = useJobs();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const filteredJobs = useFilteredJobs(jobs, filters);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  // Look the job up by id so the drawer always shows the latest data
  const viewingJob = jobs.find((job) => job.id === viewingId) ?? null;

  function openAddForm() {
    setEditingJob(null);
    setIsFormOpen(true);
  }

  function openEditForm(job) {
    setViewingId(null);
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
          <p className="text-sm text-slate-500">
            {filteredJobs.length === jobs.length
              ? `${jobs.length} jobs tracked`
              : `Showing ${filteredJobs.length} of ${jobs.length} jobs`}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add job
        </button>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      <Board
        jobs={filteredJobs}
        onEdit={openEditForm}
        onOpen={(job) => setViewingId(job.id)}
      />

      {viewingJob && (
        <JobDrawer
          job={viewingJob}
          onClose={() => setViewingId(null)}
          onEdit={openEditForm}
        />
      )}

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
