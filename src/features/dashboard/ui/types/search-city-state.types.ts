import { CityWeatherEntity } from "@/features/dashboard/domain/entities/city-weather.entity"

export type SearchCityState =
  | { status: "idle" }
  | { status: "success"; data: CityWeatherEntity }
  | { status: "error"; message: string }
