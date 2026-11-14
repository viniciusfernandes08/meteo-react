import { render, screen } from "@testing-library/react";
import { Header } from "@/features/dashboard/ui/components/Header";

describe("Header", () => {
  it("should render the application name", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: "METEO REACT" }),
    ).toBeInTheDocument();
  });

  it('should apply the correct styles to header h2', () => {
    render(<Header />);

    const h2Element = screen.getByRole("heading", { name: "METEO REACT" });

    expect(h2Element).toHaveClass("text-[#F1F5F9] font-sm font-serif pt-0.5");
  })

  it("should render the CloudSun icon", () => {
    render(<Header />);

    expect(
      screen.getByTestId("cloud-sun-icon"),
    ).toBeInTheDocument();
  })

  it("should apply the correct styles to CloudSun icon", () => {
    render(<Header />);

    const cloudSunIcon = screen.getByTestId("cloud-sun-icon");

    expect(cloudSunIcon).toHaveClass("text-sky-300");
  })
});
