import { GetCityWeatherDataDTO } from '@/features/dashboard/infra/dtos/get-city-weather-data.dto';
import { getCityWeatherDataMapper } from '@/features/dashboard/infra/mappers/get-city-weather-data.mapper';

const dto: GetCityWeatherDataDTO = {
  coord: { lon: -46.63, lat: -23.55 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 24,
    feels_like: 23,
    temp_min: 22,
    temp_max: 26,
    pressure: 1012,
    humidity: 60,
    sea_level: 1012,
    grnd_level: 1008,
  },
  visibility: 10000,
  wind: { speed: 3, deg: 180, gust: 4 },
  clouds: { all: 0 },
  dt: 1700000000,
  sys: {
    type: 2,
    id: 1,
    country: 'BR',
    sunrise: 1700000000,
    sunset: 1700040000,
  },
  timezone: -10800,
  id: 3448439,
  name: 'São Paulo',
  cod: 200,
};

describe('getCityWeatherDataMapper', () => {
  it('should map weather data from the DTO to the domain entity', () => {
    expect(getCityWeatherDataMapper.toDomain(dto)).toEqual({
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      main: {
        temp: 24,
        feelsLike: 23,
      },
      cityName: 'São Paulo',
    });
  });

  it('should use empty and zero defaults when optional data is missing', () => {
    const incompleteDto = {
      ...dto,
      weather: undefined,
      main: undefined,
      name: undefined,
    } as unknown as GetCityWeatherDataDTO;

    expect(getCityWeatherDataMapper.toDomain(incompleteDto)).toEqual({
      weather: [],
      main: {
        temp: 0,
        feelsLike: 0,
      },
      cityName: '',
    });
  });

  it('should use empty and zero defaults when the DTO is null', () => {
    expect(
      getCityWeatherDataMapper.toDomain(
        null as unknown as GetCityWeatherDataDTO,
      ),
    ).toEqual({
      weather: [],
      main: {
        temp: 0,
        feelsLike: 0,
      },
      cityName: '',
    });
  });
});
