import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import { JobCardContent } from "./JobCard";
import { STATUSES } from "../../utils/constants";
import { columnKeyboardCoordinates } from "../../hooks/keyboardCoordinates";
import { useJobs } from "../../context/useJobs";

export default function Board({ jobs, onEdit, onOpen }) {
  const { dispatch } = useJobs();
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    // Drag starts only after moving 5px, so clicks on Edit/Delete still work
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    // Keyboard: Space to pick up, Left/Right arrows to change column, Space to drop
    useSensor(KeyboardSensor, { coordinateGetter: columnKeyboardCoordinates }),
  );

  function handleDragStart(event) {
    setActiveJob(jobs.find((job) => job.id === event.active.id) ?? null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveJob(null);
    if (!over) return; // dropped outside any column

    const job = jobs.find((j) => j.id === active.id);
    if (job && job.status !== over.id) {
      dispatch({
        type: "MOVE_JOB",
        payload: { id: active.id, status: over.id },
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveJob(null)}
    >
      {/* On small screens the columns scroll sideways; on large screens they share the width */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            jobs={jobs.filter((job) => job.status === status.id)}
            onEdit={onEdit}
            onOpen={onOpen}
          />
        ))}
      </div>

      {/* The floating copy of the card that follows the mouse */}
      <DragOverlay>
        {activeJob ? <JobCardContent job={activeJob} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
