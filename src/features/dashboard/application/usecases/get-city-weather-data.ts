import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';

export async function getCityWeatherDataUseCase(
  repository: DashboardRepository,
  params: { lat: number; lon: number }
) {
  const { lat, lon } = params;

  return repository.getCityWeatherData(lat, lon)
}
