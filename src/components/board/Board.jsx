import Column from "./Column";
import { STATUSES } from "../../utils/constants";

export default function Board({ jobs, onEdit }) {
  return (
    // On small screens the columns scroll sideways; on large screens they share the width
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUSES.map((status) => (
        <Column
          key={status.id}
          status={status}
          jobs={jobs.filter((job) => job.status === status.id)}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
