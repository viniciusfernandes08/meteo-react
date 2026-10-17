import { GetCityWeatherDataDTO } from "@/features/dashboard/infra/dtos/get-city-weather-data.dto"
import { CityWeatherDataEntity } from "@/features/dashboard/domain/entities/city-weather-data.entity"

export const getCityWeatherDataMapper = {
  toDomain(dto: GetCityWeatherDataDTO): CityWeatherDataEntity {
    return {
      weather: dto?.weather?.map((weather) => ({
        id: weather.id,
        main: weather.main,
        description: weather.description,
        icon: weather.icon
      })) ?? []
    }
  }
}