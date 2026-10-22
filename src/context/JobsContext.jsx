import { createContext, useContext, useEffect, useReducer } from "react";
import { STORAGE_KEY } from "../utils/constants";
import { sampleJobs } from "../data/sampleJobs";

const JobsContext = createContext(null);

// All changes to the jobs list happen here, in one place.
function jobsReducer(jobs, action) {
  switch (action.type) {
    case "ADD_JOB":
      return [
        ...jobs,
        {
          ...action.payload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ];
    case "UPDATE_JOB":
      return jobs.map((job) =>
        job.id === action.payload.id ? { ...job, ...action.payload } : job,
      );
    case "DELETE_JOB":
      return jobs.filter((job) => job.id !== action.payload);
    case "MOVE_JOB":
      return jobs.map((job) =>
        job.id === action.payload.id
          ? { ...job, status: action.payload.status }
          : job,
      );
    case "IMPORT_JOBS":
      return action.payload;
    default:
      return jobs;
  }
}

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

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used inside <JobsProvider>");
  return context;
}
