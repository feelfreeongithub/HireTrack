import { STATUSES } from "./constants";

// Numbers for the 4 stat cards
export function getStats(jobs) {
  const applied = jobs.filter((job) => job.status !== "wishlist").length;
  const interviews = jobs.filter((job) => job.status === "interview").length;
  const offers = jobs.filter((job) => job.status === "offer").length;
  // A "response" = any reply: interview, offer or rejection
  const responses = jobs.filter((job) =>
    ["interview", "offer", "rejected"].includes(job.status),
  ).length;
  const responseRate =
    applied === 0 ? 0 : Math.round((responses / applied) * 100);

  return { applied, interviews, offers, responseRate };
}

// How many jobs are in each status (for the status chart)
export function getStatusCounts(jobs) {
  return STATUSES.map((status) => ({
    name: status.label,
    count: jobs.filter((job) => job.status === status.id).length,
    color: status.color,
  }));
}

// Applications per week for the last 8 weeks (weeks start on Monday)
export function getWeeklyApplications(jobs, weeks = 8) {
  const startOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = (d.getDay() + 6) % 7; // Monday = 0
    d.setDate(d.getDate() - day);
    return d;
  };

  const thisWeek = startOfWeek(new Date());
  const buckets = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(thisWeek);
    start.setDate(start.getDate() - i * 7);
    buckets.push({
      start: start.getTime(),
      week: start.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      count: 0,
    });
  }

  jobs.forEach((job) => {
    if (!job.appliedOn) return;
    const weekStart = startOfWeek(job.appliedOn + "T00:00:00").getTime();
    const bucket = buckets.find((b) => b.start === weekStart);
    if (bucket) bucket.count += 1;
  });

  return buckets.map(({ week, count }) => ({ week, count }));
}
