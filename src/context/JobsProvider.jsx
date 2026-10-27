import { useEffect, useReducer } from "react";
import { JobsContext } from "./JobsContext";
import { STORAGE_KEY } from "../utils/constants";
import { sampleJobs } from "../data/sampleJobs";
import { jobsReducer } from "./jobsReducer";

// All changes to the jobs list happen here, in one place.


// Runs once on first render: saved jobs, or demo data on the first visit.
function loadJobs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleJobs;
  } catch {
    return sampleJobs;
  }
}

export function JobsProvider({ children }) {
  const [jobs, dispatch] = useReducer(jobsReducer, undefined, loadJobs);

  // Save to localStorage every time the jobs change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {
      // ignore storage errors
    }
  }, [jobs]);

  return (
    <JobsContext.Provider value={{ jobs, dispatch }}>
      {children}
    </JobsContext.Provider>
  );
}
