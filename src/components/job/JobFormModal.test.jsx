import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobFormModal from "./JobFormModal";
import { JobsProvider } from "../../context/JobsProvider";

function renderForm() {
  const onClose = vi.fn();
  render(
    <JobsProvider>
      <JobFormModal job={null} onClose={onClose} />
    </JobsProvider>,
  );
  return { onClose };
}

// render(<Component />) shows the component in a fake browser.

describe("JobFormModal", () => {
  test("shows errors when required fields are empty", async () => {
    const user = userEvent.setup();
    const { onClose } = renderForm();

    await user.click(screen.getByRole("button", { name: /add job/i }));

    // screen.getByRole('button', { name: /add job/i }) finds the button the way a user sees it, by its text.

    expect(screen.getByText("Company is required")).toBeInTheDocument();
    expect(screen.getByText("Role is required")).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  test("closes after a valid submit", async () => {
    const user = userEvent.setup();
    const { onClose } = renderForm();

    await user.type(screen.getByLabelText(/company/i), "Acme");
    await user.type(screen.getByLabelText(/^role/i), "React Developer");
    await user.click(screen.getByRole("button", { name: /add job/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
