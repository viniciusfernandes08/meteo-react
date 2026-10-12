import { DashboardRepository } from "@/features/dashboard/domain/repositories/dashboard.repository"

export async function getCityCoordinatesUseCase(
  repository: DashboardRepository,
  city: string
) {
  return repository.getCityCoordinates(city)
}