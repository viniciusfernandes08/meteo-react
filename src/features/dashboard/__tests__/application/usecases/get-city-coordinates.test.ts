import { getCityCoordinatesUseCase } from '@/features/dashboard/application/usecases/get-city-coordinates';
import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';

describe('getCityCoordinatesUseCase', () => {
  let repository: jest.Mocked<DashboardRepository>;

  beforeEach(() => {
    repository = {
      getCityCoordinates: jest.fn(),
      getCityWeatherData: jest.fn(),
    };
  });

  it('should call the repository with the correct city', async () => {
    const coordinates = { lat: -23.55, lon: -46.63 };
    repository.getCityCoordinates.mockResolvedValue(coordinates);

    const result = await getCityCoordinatesUseCase(repository, 'São Paulo');

    expect(repository.getCityCoordinates).toHaveBeenCalledWith('São Paulo');
    expect(result).toBe(coordinates);
  });

  it('should rethrow the repository error without modifying it', async () => {
    const error = new Error('Coordinates request failed');
    repository.getCityCoordinates.mockRejectedValue(error);

    await expect(
      getCityCoordinatesUseCase(repository, 'São Paulo'),
    ).rejects.toBe(error);
  });
});
