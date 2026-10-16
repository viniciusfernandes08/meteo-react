import { CityCoordinatesEntity } from "@/features/dashboard/domain/entities/city-coordinates.entity"

export interface DashboardRepository {
  getCityCoordinates(city: string): Promise<CityCoordinatesEntity>
  getCityWeatherData(lat: number, lon: number): Promise<unknown>
}