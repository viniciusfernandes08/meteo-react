import { render, screen } from "@testing-library/react";

import { Header } from "./index";

describe("Header", () => {
  it("renders the application name", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: "METEO REACT" }),
    ).toBeInTheDocument();
  });
});
