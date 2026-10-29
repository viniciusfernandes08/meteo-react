import { DashboardRepository } from "@/features/dashboard/domain/repositories/dashboard.repository"
import { CityCoordinatesEntity } from "@/features/dashboard/domain/entities/city-coordinates.entity"
import { GetCityCoordinatesDTO } from "@/features/dashboard/infra/dtos/get-city-coordinates.dto"
import { getCityCoordinatesMapper } from "@/features/dashboard/infra/mappers/get-city-coordinates.mapper"
import { GetCityWeatherDataDTO } from "@/features/dashboard/infra/dtos/get-city-weather-data.dto"
import { getCityWeatherDataMapper } from "@/features/dashboard/infra/mappers/get-city-weather-data.mapper"
import { CityWeatherDataEntity } from "@/features/dashboard/domain/entities/city-weather-data.entity"
import { DashboardError } from "@/features/dashboard/domain/errors/dashboard.error"

const REQUEST_TIMEOUT_MS = 8000

class DashboardRepositoryImpl implements DashboardRepository {
  private async request(url: string): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      })

      if (!response.ok) {
        throw new DashboardError(
          response.status === 404 ? "CITY_NOT_FOUND" : "UPSTREAM_ERROR",
          `Request to ${url} failed with status ${response.status}`
        )
      }

      return response
    } catch (error) {
      if (error instanceof DashboardError) {
        throw error
      }

      if (
        error instanceof DOMException &&
        (error.name === "TimeoutError" || error.name === "AbortError")
      ) {
        throw new DashboardError("TIMEOUT", `Request to ${url} timed out`)
      }

      throw new DashboardError(
        "UNKNOWN",
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    }
  }

  async getCityCoordinates(city: string): Promise<CityCoordinatesEntity> {
    const response = await this.request(`/api/coordinates/${encodeURIComponent(city)}`)

    const data: GetCityCoordinatesDTO = await response.json()

    return getCityCoordinatesMapper.toDomain(data)
  }

  async getCityWeatherData(lat: number, lon: number): Promise<CityWeatherDataEntity> {
    const response = await this.request(`/api/weather?lat=${lat}&lon=${lon}`)

    const data: GetCityWeatherDataDTO = await response.json()

    return getCityWeatherDataMapper.toDomain(data)
  }
}

export const dashboardRepositoryImpl = new DashboardRepositoryImpl()
