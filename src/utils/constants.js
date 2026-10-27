export const STORAGE_KEY = "hiretrack-jobs";

export const STATUSES = [
  { id: "wishlist", label: "Wishlist", dot: "bg-slate-400", color: "#94a3b8" },
  { id: "applied", label: "Applied", dot: "bg-blue-500", color: "#3b82f6" },
  {
    id: "interview",
    label: "Interview",
    dot: "bg-amber-500",
    color: "#f59e0b",
  },
  { id: "offer", label: "Offer", dot: "bg-green-500", color: "#22c55e" },
  { id: "rejected", label: "Rejected", dot: "bg-red-500", color: "#ef4444" },
];

export const PLATFORMS = [
  "Naukri",
  "Instahyre",
  "Cutshort",
  "Wellfound",
  "Hirist",
  "Company site",
  "Referral",
  "Other",
];

export const WORK_TYPES = ["Remote", "Hybrid", "Onsite"];

export const DEFAULT_FILTERS = {
  search: "",
  platform: "All",
  workType: "All",
  sort: "newest",
};
