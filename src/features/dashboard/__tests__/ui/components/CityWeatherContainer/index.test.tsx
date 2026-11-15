import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { CityWeatherContainer } from "@/features/dashboard/ui/components/CityWeatherContainer";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  ViewTransition: ({ children }: { children: ReactNode }) => children,
}));

jest.mock(
  "../../../../ui/hooks",
  () => ({
    useSearchCity: jest.fn(),
  }),
);

const mockUseSearchCity = jest.requireMock("../../../../ui/hooks")
  .useSearchCity as jest.Mock;

const city = {
  cityName: "São Paulo",
  main: {
    temp: 24,
    feelsLike: 25,
  },
  weather: {
    id: 800,
    main: "Clear",
    description: "céu limpo",
    icon: "01d",
  },
};

describe("CityWeatherContainer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the loading state while a search is pending", () => {
    mockUseSearchCity.mockReturnValue({
      onSubmitCityAction: jest.fn(),
      state: { status: "idle" },
      isPending: true,
    });

    render(<CityWeatherContainer />);

    expect(screen.getByAltText("Loading")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite a cidade")).toBeDisabled();
  });

  it("should render the error state when the search fails", () => {
    mockUseSearchCity.mockReturnValue({
      onSubmitCityAction: jest.fn(),
      state: {
        status: "error",
        message: "Cidade não encontrada",
      },
      isPending: false,
    });

    render(<CityWeatherContainer />);

    expect(screen.getByRole("alert")).toHaveTextContent("Cidade não encontrada");
    expect(screen.queryByAltText("Loading")).not.toBeInTheDocument();
  });

  it("should render only the search form in the initial state", () => {
    mockUseSearchCity.mockReturnValue({
      onSubmitCityAction: jest.fn(),
      state: { status: "idle" },
      isPending: false,
    });

    render(<CityWeatherContainer />);

    expect(screen.getByPlaceholderText("Digite a cidade")).toBeInTheDocument();
    expect(screen.queryByAltText("Loading")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should render the weather card when the search succeeds", () => {
    mockUseSearchCity.mockReturnValue({
      onSubmitCityAction: jest.fn(),
      state: {
        status: "success",
        data: city,
      },
      isPending: false,
    });

    render(<CityWeatherContainer />);

    expect(screen.getByRole("heading", { name: "SÃO PAULO" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
