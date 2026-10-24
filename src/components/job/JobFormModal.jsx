import { useState } from "react";
import Modal from "../ui/Modal";
import { PLATFORMS, STATUSES, WORK_TYPES } from "../../utils/constants";
import { todayISO } from "../../utils/dates";
import { useJobs } from "../../context/useJobs";

// A function, so 'Applied on' is always today's date when the form opens
const emptyJob = () => ({
  company: "",
  role: "",
  link: "",
  platform: "Naukri",
  workType: "Remote",
  salary: "",
  status: "applied",
  appliedOn: todayISO(),
  followUpOn: "",
  notes: "",
});

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-800";
const labelClass = "mb-1 block text-sm font-medium";

// job = null means "add a new job"; otherwise we are editing that job
export default function JobFormModal({ job, onClose }) {
  const { dispatch } = useJobs();
  const [form, setForm] = useState(() => job ?? emptyJob());
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(job);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (isEditing) {
      dispatch({ type: "UPDATE_JOB", payload: form });
    } else {
      dispatch({ type: "ADD_JOB", payload: form });
    }
    onClose();
  }

  return (
    <Modal title={isEditing ? "Edit job" : "Add job"} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div>
          <label htmlFor="company" className={labelClass}>
            Company *
          </label>
          <input
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            autoFocus
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-600">{errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className={labelClass}>
            Role *
          </label>
          <input
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.role && (
            <p className="mt-1 text-xs text-red-600">{errors.role}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="link" className={labelClass}>
            Job link
          </label>
          <input
            id="link"
            name="link"
            type="url"
            value={form.link}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://"
          />
        </div>

        <div>
          <label htmlFor="platform" className={labelClass}>
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className={inputClass}
          >
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="workType" className={labelClass}>
            Work type
          </label>
          <select
            id="workType"
            name="workType"
            value={form.workType}
            onChange={handleChange}
            className={inputClass}
          >
            {WORK_TYPES.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="salary" className={labelClass}>
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 8-12 LPA"
          />
        </div>

        <div>
          <label htmlFor="appliedOn" className={labelClass}>
            Applied on
          </label>
          <input
            id="appliedOn"
            name="appliedOn"
            type="date"
            value={form.appliedOn}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="followUpOn" className={labelClass}>
            Follow up on
          </label>
          <input
            id="followUpOn"
            name="followUpOn"
            type="date"
            value={form.followUpOn}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-2 sm:col-span-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isEditing ? "Save changes" : "Add job"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
