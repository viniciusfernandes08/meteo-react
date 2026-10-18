export interface CityWeatherDataEntity {
  weather: Weather[]
  main: {
    temp: number
    feelsLike: number
  }
  cityName: string
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}