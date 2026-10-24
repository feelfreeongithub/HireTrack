// Keyboard dragging: Left/Right arrow jumps the card one whole column
// (dnd-kit's default only moves it 25px per key press).
export function columnKeyboardCoordinates(
  event,
  { context, currentCoordinates },
) {
  const { collisionRect, droppableRects } = context;
  if (!collisionRect) return undefined;
  if (event.code !== "ArrowRight" && event.code !== "ArrowLeft")
    return undefined;

  event.preventDefault();
  const columns = [...droppableRects.values()];

  const nextColumn =
    event.code === "ArrowRight"
      ? columns
          .filter((r) => r.left > collisionRect.left + 20)
          .sort((a, b) => a.left - b.left)[0]
      : columns
          .filter((r) => r.left < collisionRect.left - 20)
          .sort((a, b) => b.left - a.left)[0];

  if (!nextColumn) return undefined; // already at the first/last column

  return {
    x: currentCoordinates.x + (nextColumn.left + 12 - collisionRect.left),
    y: currentCoordinates.y,
  };
}
