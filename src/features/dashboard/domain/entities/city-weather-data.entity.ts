export interface CityWeatherDataEntity {
  weather: Weather[]
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}