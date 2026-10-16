import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';
import { getCityCoordinatesUseCase } from './get-city-coordinates';

export async function getCityWeatherUseCase(
  repository: DashboardRepository, 
  city: string
) {
  const { lat, lon } = await getCityCoordinatesUseCase(repository, city);

  return {
    lat,
    lon
  }
}