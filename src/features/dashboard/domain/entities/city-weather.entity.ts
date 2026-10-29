import { MainCity, Weather } from "@/features/dashboard/domain/entities/city-weather-data.entity"

export interface CityWeatherEntity {
  weather: Weather
  main: MainCity
  cityName: string
}
