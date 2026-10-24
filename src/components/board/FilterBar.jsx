import { DEFAULT_FILTERS, PLATFORMS, WORK_TYPES } from "../../utils/constants";

const controlClass =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-800";

export default function FilterBar({ filters, onChange }) {
  const isFiltered =
    filters.search !== "" ||
    filters.platform !== "All" ||
    filters.workType !== "All";

  function update(name, value) {
    onChange({ ...filters, [name]: value });
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <input
        type="search"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search company or role…"
        aria-label="Search company or role"
        className={`${controlClass} min-w-0 flex-1 basis-56`}
      />

      <select
        value={filters.platform}
        onChange={(e) => update("platform", e.target.value)}
        aria-label="Filter by platform"
        className={controlClass}
      >
        <option value="All">All platforms</option>
        {PLATFORMS.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <select
        value={filters.workType}
        onChange={(e) => update("workType", e.target.value)}
        aria-label="Filter by work type"
        className={controlClass}
      >
        <option value="All">All work types</option>
        {WORK_TYPES.map((w) => (
          <option key={w}>{w}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
        aria-label="Sort by date"
        className={controlClass}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>

      {isFiltered && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
