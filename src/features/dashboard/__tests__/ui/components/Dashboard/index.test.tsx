import { render, screen } from "@testing-library/react";
import { Dashboard } from "@/features/dashboard/ui/components/Dashboard";

describe("Dashboard component", () => {
  it("should render the dashboard layout with the header and search form", () => {
    render(<Dashboard />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "METEO REACT" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquise a cidade")).toBeInTheDocument();
  });
});
