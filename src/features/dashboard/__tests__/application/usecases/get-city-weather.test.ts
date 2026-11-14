import { getCityWeatherUseCase } from '@/features/dashboard/application/usecases/get-city-weather';
import { DashboardError } from '@/features/dashboard/domain/errors/dashboard.error';
import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';

const coordinates = { lat: -23.55, lon: -46.63 };
const weather = {
  id: 800,
  main: 'Clear',
  description: 'clear sky',
  icon: '01d',
};
const weatherData = {
  weather: [weather],
  main: { temp: 24, feelsLike: 23 },
  cityName: 'São Paulo',
};

function createRepository(
  overrides: Partial<{
    getCityCoordinates: DashboardRepository['getCityCoordinates'];
    getCityWeatherData: DashboardRepository['getCityWeatherData'];
  }> = {},
): DashboardRepository {
  return {
    getCityCoordinates: jest
      .fn()
      .mockResolvedValue(coordinates)
      .mockImplementation(overrides.getCityCoordinates ?? (() => Promise.resolve(coordinates))),
    getCityWeatherData: jest
      .fn()
      .mockResolvedValue(weatherData)
      .mockImplementation(overrides.getCityWeatherData ?? (() => Promise.resolve(weatherData))),
  };
}

describe('getCityWeatherUseCase', () => {
  it('should fetch coordinates and weather data with the correct parameters', async () => {
    const repository = createRepository();

    const result = await getCityWeatherUseCase(repository, 'São Paulo');

    expect(repository.getCityCoordinates).toHaveBeenCalledWith('São Paulo');
    expect(repository.getCityWeatherData).toHaveBeenCalledWith(
      coordinates.lat,
      coordinates.lon,
    );
    expect(result).toEqual({
      status: 'success',
      data: {
        weather,
        main: weatherData.main,
        cityName: weatherData.cityName,
      },
    });
  });

  it('should return an upstream error when no weather is returned', async () => {
    const repository = createRepository({
      getCityWeatherData: jest.fn().mockResolvedValue({
        ...weatherData,
        weather: [],
      }),
    });

    await expect(getCityWeatherUseCase(repository, 'São Paulo')).resolves.toEqual({
      status: 'error',
      code: 'UPSTREAM_ERROR',
    });
  });

  it('should return the dashboard error code when coordinates lookup fails', async () => {
    const error = new DashboardError('CITY_NOT_FOUND', 'City not found');
    const repository = createRepository({
      getCityCoordinates: jest.fn().mockRejectedValue(error),
    });

    await expect(getCityWeatherUseCase(repository, 'Unknown')).resolves.toEqual({
      status: 'error',
      code: 'CITY_NOT_FOUND',
    });
    expect(repository.getCityWeatherData).not.toHaveBeenCalled();
  });

  it('should return the dashboard error code when weather lookup fails', async () => {
    const error = new DashboardError('TIMEOUT', 'Weather request timed out');
    const repository = createRepository({
      getCityWeatherData: jest.fn().mockRejectedValue(error),
    });

    await expect(getCityWeatherUseCase(repository, 'São Paulo')).resolves.toEqual({
      status: 'error',
      code: 'TIMEOUT',
    });
  });

  it('should return UNKNOWN for unexpected errors', async () => {
    const error = new Error('Unexpected failure');
    const repository = createRepository({
      getCityCoordinates: jest.fn().mockRejectedValue(error),
    });

    await expect(getCityWeatherUseCase(repository, 'São Paulo')).resolves.toEqual({
      status: 'error',
      code: 'UNKNOWN',
    });
  });
});
