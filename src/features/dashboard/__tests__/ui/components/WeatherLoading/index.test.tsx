import { render, screen } from "@testing-library/react";
import { WeatherLoading } from "@/features/dashboard/ui/components/WeatherLoading";

describe("WeatherLoading component", () => {
  it("should render the loading weather icon", () => {
    render(<WeatherLoading />);

    const image = screen.getByRole("img", { name: "Loading" });

    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("animate-pulse");
    expect(image).toHaveAttribute("src", expect.stringContaining("sunny_icon"));
  });
});
