import { useMemo } from "react";

// Returns the jobs that match the search and filters, sorted by date.
// useMemo means this only recalculates when jobs or filters change.
export function useFilteredJobs(jobs, filters) {
  return useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.company.toLowerCase().includes(search) ||
        job.role.toLowerCase().includes(search);
      const matchesPlatform =
        filters.platform === "All" || job.platform === filters.platform;
      const matchesWorkType =
        filters.workType === "All" || job.workType === filters.workType;
      return matchesSearch && matchesPlatform && matchesWorkType;
    });

    // Jobs without an applied date go to the end
    return [...result].sort((a, b) => {
      const dateA = a.appliedOn || "";
      const dateB = b.appliedOn || "";
      if (dateA === dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return filters.sort === "newest"
        ? dateB.localeCompare(dateA)
        : dateA.localeCompare(dateB);
    });
  }, [jobs, filters]);
}
