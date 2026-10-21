export interface CityWeatherDataEntity {
  weather: Weather[]
  main: MainCity
  cityName: string
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainCity {
  temp: number
  feelsLike: number
}