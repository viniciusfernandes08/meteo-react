import { GetCityCoordinatesDTO } from "@/features/dashboard/infra/dtos/get-city-coordinates.dto"
import { CityCoordinatesEntity } from "@/features/dashboard/domain/entities/city-coordinates.entity"

export const getCityCoordinatesMapper = {
  toDomain(dto: GetCityCoordinatesDTO): CityCoordinatesEntity {
    return {
      lat: dto.lat ?? 0,
      lon: dto.lon ?? 0
    }
  }
}