import { getCityWeatherDataUseCase } from '@/features/dashboard/application/usecases/get-city-weather-data';
import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';

describe('getCityWeatherDataUseCase', () => {
  let repository: jest.Mocked<DashboardRepository>;

  beforeEach(() => {
    repository = {
      getCityCoordinates: jest.fn(),
      getCityWeatherData: jest.fn(),
    };
  });

  it('should call the repository with the correct coordinates', async () => {
    const weatherData = {
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      main: { temp: 24, feelsLike: 23 },
      cityName: 'São Paulo',
    };
    repository.getCityWeatherData.mockResolvedValue(weatherData);

    const result = await getCityWeatherDataUseCase(repository, {
      lat: -23.55,
      lon: -46.63,
    });

    expect(repository.getCityWeatherData).toHaveBeenCalledWith(-23.55, -46.63);
    expect(result).toBe(weatherData);
  });

  it('should rethrow the repository error without modifying it', async () => {
    const error = new Error('Weather request failed');
    repository.getCityWeatherData.mockRejectedValue(error);

    await expect(
      getCityWeatherDataUseCase(repository, { lat: -23.55, lon: -46.63 }),
    ).rejects.toBe(error);
  });
});
