import { render, screen } from "@testing-library/react";

import DemoComponent from "./DemoComponent";

describe("Clicker render", () => {
  it("renders without crashing", () => {
    render(<DemoComponent buildTime={10} />);
    expect(screen.getAllByRole("heading")).toHaveLength(2);
  });

  it("Check initial default state", () => {
    render(<DemoComponent buildTime={10} />);
    expect(screen.getByTestId("buildTime")).toHaveAttribute("data-value", "10");
  });
});
