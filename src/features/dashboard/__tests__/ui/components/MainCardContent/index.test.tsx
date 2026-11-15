import { render, screen } from "@testing-library/react";
import { MainCardContent } from "@/features/dashboard/ui/components/MainCardContent";

const city = {
  cityName: "São Paulo",
  main: {
    temp: 24.6,
    feelsLike: 25.4,
  },
  weather: {
    id: 802,
    main: "Clouds",
    description: "céu parcialmente nublado",
    icon: "02d",
  },
};

describe("MainCardContent component", () => {
  it("should render the city weather information", () => {
    render(<MainCardContent city={city} />);

    expect(screen.getByRole("heading", { name: "SÃO PAULO" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "25°C" })).toBeInTheDocument();
    expect(
      screen.getByText("Céu Parcialmente Nublado"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sensação térmica 25°C")).toBeInTheDocument();
  });

  it("should render the weather icon with the weather description as alt text", () => {
    render(<MainCardContent city={city} />);

    const image = screen.getByRole("img", {
      name: "céu parcialmente nublado",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("02d%402x.png"),
    );
  });
});
