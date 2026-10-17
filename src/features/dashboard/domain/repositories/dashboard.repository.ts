import { CityCoordinatesEntity } from "@/features/dashboard/domain/entities/city-coordinates.entity"
import { CityWeatherDataEntity } from "@/features/dashboard/domain/entities/city-weather-data.entity"

export interface DashboardRepository {
  getCityCoordinates(city: string): Promise<CityCoordinatesEntity>
  getCityWeatherData(lat: number, lon: number): Promise<CityWeatherDataEntity>
}