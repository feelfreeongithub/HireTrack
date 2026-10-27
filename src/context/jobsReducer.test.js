import { describe, expect, test } from "vitest";
import { jobsReducer } from "./jobsReducer";

const jobs = [
  { id: "1", company: "Acme", role: "React Dev", status: "applied" },
  { id: "2", company: "Globex", role: "UI Engineer", status: "wishlist" },
];

describe("jobsReducer", () => {
  test("ADD_JOB adds a new job with an id", () => {
    const result = jobsReducer(jobs, {
      type: "ADD_JOB",
      payload: { company: "Initech", role: "Frontend", status: "applied" },
    });
    expect(result).toHaveLength(3);
    expect(result[2].company).toBe("Initech");
    expect(result[2].id).toBeDefined();
  });

  test("MOVE_JOB changes only the status of that job", () => {
    const result = jobsReducer(jobs, {
      type: "MOVE_JOB",
      payload: { id: "1", status: "interview" },
    });
    expect(result[0].status).toBe("interview");
    expect(result[1].status).toBe("wishlist"); // other job unchanged
  });

  test("DELETE_JOB removes the job", () => {
    const result = jobsReducer(jobs, { type: "DELETE_JOB", payload: "2" });
    expect(result).toHaveLength(1);
    expect(result.find((job) => job.id === "2")).toBeUndefined();
  });
});
