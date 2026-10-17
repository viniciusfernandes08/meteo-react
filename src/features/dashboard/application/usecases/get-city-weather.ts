import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';
import { getCityCoordinatesUseCase } from './get-city-coordinates';
import { getCityWeatherDataUseCase } from './get-city-weather-data';

export async function getCityWeatherUseCase(
  repository: DashboardRepository, 
  city: string
) {
  const { lat, lon } = await getCityCoordinatesUseCase(repository, city);

  const weatherData = await getCityWeatherDataUseCase(repository, { lat, lon });

  return {
    lat,
    lon
  }
}