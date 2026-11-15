import { renderHook } from "@testing-library/react";
import { startTransition, useActionState } from "react";
import { getCityWeatherUseCase } from "../../../../application/usecases/get-city-weather";
import { useSearchCity } from "@/features/dashboard/ui/hooks/useSearchCity";
import { SearchCityState } from "@/features/dashboard/ui/types/search-city-state.types";

jest.mock("react", () => {
  const actual = jest.requireActual<typeof import("react")>("react");

  return {
    ...actual,
    startTransition: jest.fn((callback: () => void) => callback()),
    useActionState: jest.fn(),
  };
});

jest.mock("../../../../application/usecases/get-city-weather", () => ({
  getCityWeatherUseCase: jest.fn(),
}));

const mockedStartTransition = startTransition as jest.MockedFunction<
  typeof startTransition
>;
const mockedUseActionState = useActionState as jest.Mock;
const mockedGetCityWeatherUseCase = getCityWeatherUseCase as jest.Mock;

const weatherData = {
  weather: {
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d",
  },
  main: {
    temp: 24,
    feelsLike: 23,
  },
  cityName: "São Paulo",
};

describe("useSearchCity hook", () => {
  let dispatchCityAction: jest.Mock;
  let cityAction:
    | ((prevState: SearchCityState, formData: FormData) => Promise<SearchCityState>)
    | undefined;

  beforeEach(() => {
    dispatchCityAction = jest.fn();
    mockedUseActionState.mockImplementation(
      (
        action: (
          prevState: SearchCityState,
          formData: FormData,
        ) => Promise<SearchCityState>,
        initialState: SearchCityState,
      ) => {
        cityAction = action;
        return [initialState, dispatchCityAction, false];
      },
    );
    mockedStartTransition.mockClear();
    mockedGetCityWeatherUseCase.mockReset();
  });

  it("should expose the idle state and submit the city action in a transition", () => {
    const { result } = renderHook(() => useSearchCity());
    const formData = new FormData();
    formData.set("city", "São Paulo");

    result.current.onSubmitCityAction(formData);

    expect(result.current.state).toEqual({ status: "idle" });
    expect(result.current.isPending).toBe(false);
    expect(mockedStartTransition).toHaveBeenCalledWith(expect.any(Function));
    expect(dispatchCityAction).toHaveBeenCalledWith(formData);
  });

  it("should return a validation error when the city is not a text value", async () => {
    const { result } = renderHook(() => useSearchCity());

    await expect(cityAction?.({ status: "idle" }, new FormData())).resolves.toEqual(
      {
        status: "error",
        message: "A cidade deve ser um texto",
      },
    );
    expect(mockedGetCityWeatherUseCase).not.toHaveBeenCalled();
    expect(result.current.state).toEqual({ status: "idle" });
  });

  it("should return the use case error message", async () => {
    mockedGetCityWeatherUseCase.mockResolvedValue({
      status: "error",
      code: "CITY_NOT_FOUND",
    });
    const { result } = renderHook(() => useSearchCity());
    const formData = new FormData();
    formData.set("city", "Unknown");

    await expect(
      cityAction?.({ status: "idle" }, formData),
    ).resolves.toEqual({
      status: "error",
      message: "Cidade não encontrada. Confira o nome e tente novamente.",
    });
    expect(mockedGetCityWeatherUseCase).toHaveBeenCalledWith(
      expect.any(Object),
      "Unknown",
    );
    expect(result.current.state).toEqual({ status: "idle" });
  });

  it("should return the weather data for a valid city", async () => {
    mockedGetCityWeatherUseCase.mockResolvedValue({
      status: "success",
      data: weatherData,
    });
    renderHook(() => useSearchCity());
    const formData = new FormData();
    formData.set("city", "  São   Paulo ");

    await expect(
      cityAction?.({ status: "idle" }, formData),
    ).resolves.toEqual({
      status: "success",
      data: weatherData,
    });
    expect(mockedGetCityWeatherUseCase).toHaveBeenCalledWith(
      expect.any(Object),
      "São Paulo",
    );
  });
});