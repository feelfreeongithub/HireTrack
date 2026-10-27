import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "./FilterBar";
import { DEFAULT_FILTERS } from "../../utils/constants";

describe("FilterBar", () => {
  test("calls onChange when the user types in search", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn(); // a fake function that remembers its calls

    render(<FilterBar filters={DEFAULT_FILTERS} onChange={handleChange} />);
    await user.type(
      screen.getByRole("searchbox", { name: /search company or role/i }),
      "a",
    );

    expect(handleChange).toHaveBeenCalledWith({
      ...DEFAULT_FILTERS,
      search: "a",
    });
  });

  test('shows "Clear filters" only when a filter is active', () => {
    const { rerender } = render(
      <FilterBar filters={DEFAULT_FILTERS} onChange={() => {}} />,
    );
    expect(
      screen.queryByRole("button", { name: /clear filters/i }),
    ).not.toBeInTheDocument();

    rerender(
      <FilterBar
        filters={{ ...DEFAULT_FILTERS, platform: "Naukri" }}
        onChange={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /clear filters/i }),
    ).toBeInTheDocument();
  });
});
