// Days between a 'YYYY-MM-DD' date and today. Returns null if there is no date.
export function daysSince(dateString) {
  if (!dateString) return null;
  const then = new Date(dateString + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today - then) / (1000 * 60 * 60 * 24));
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// True when a follow-up date has arrived and the job is still waiting on a reply
export function isFollowUpDue(job) {
  if (!job.followUpOn) return false;
  if (!["applied", "interview"].includes(job.status)) return false;
  return job.followUpOn <= todayISO();
}
