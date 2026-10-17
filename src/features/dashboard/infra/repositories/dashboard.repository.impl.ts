import { DashboardRepository } from "@/features/dashboard/domain/repositories/dashboard.repository"
import { CityCoordinatesEntity } from "@/features/dashboard/domain/entities/city-coordinates.entity"
import { GetCityCoordinatesDTO } from "@/features/dashboard/infra/dtos/get-city-coordinates.dto"
import { getCityCoordinatesMapper } from "@/features/dashboard/infra/mappers/get-city-coordinates.mapper"
import { GetCityWeatherDataDTO } from "@/features/dashboard/infra/dtos/get-city-weather-data.dto"
import { getCityWeatherDataMapper } from "@/features/dashboard/infra/mappers/get-city-weather-data.mapper"
import { CityWeatherDataEntity } from "@/features/dashboard/domain/entities/city-weather-data.entity"

class DashboardRepositoryImpl implements DashboardRepository {
  async getCityCoordinates(city: string): Promise<CityCoordinatesEntity> {
    const response = await fetch(`/api/coordinates/${city}`, {
      method: "GET",
      signal: AbortSignal.timeout(5000)
    })

    const data: GetCityCoordinatesDTO = await response.json()

    return getCityCoordinatesMapper.toDomain(data)
  }

  async getCityWeatherData(lat: number, lon: number): Promise<CityWeatherDataEntity> {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, {
      method: "GET",
      signal: AbortSignal.timeout(5000)
    })

    const data: GetCityWeatherDataDTO = await response.json()

    return getCityWeatherDataMapper.toDomain(data)
  }
}

export const dashboardRepositoryImpl = new DashboardRepositoryImpl()