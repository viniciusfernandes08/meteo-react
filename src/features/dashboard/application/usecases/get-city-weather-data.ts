import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';
import { GetCityWeatherDataParams } from '@/features/dashboard/domain/types/get-city-weather-data.types';

export async function getCityWeatherDataUseCase(
  repository: DashboardRepository,
  params: GetCityWeatherDataParams
) {
  const { lat, lon } = params;

  return repository.getCityWeatherData(lat, lon)
}
