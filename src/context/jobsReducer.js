export function jobsReducer(jobs, action) {
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
