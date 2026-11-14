import { DashboardError } from '@/features/dashboard/domain/errors/dashboard.error';
import { GetCityCoordinatesDTO } from '@/features/dashboard/infra/dtos/get-city-coordinates.dto';
import { GetCityWeatherDataDTO } from '@/features/dashboard/infra/dtos/get-city-weather-data.dto';
import { dashboardRepositoryImpl } from '@/features/dashboard/infra/repositories/dashboard.repository.impl';

const coordinatesDto: GetCityCoordinatesDTO = {
  name: 'São Paulo',
  lat: -23.55,
  lon: -46.63,
  country: 'BR',
};

const weatherDataDto: GetCityWeatherDataDTO = {
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

function createResponse(body: unknown, status: number): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe('dashboardRepositoryImpl', () => {
  let fetchMock: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and map city coordinates', async () => {
    fetchMock.mockResolvedValue(createResponse(coordinatesDto, 200));

    const result = await dashboardRepositoryImpl.getCityCoordinates('São Paulo');

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/coordinates/S%C3%A3o%20Paulo',
      expect.objectContaining({
        method: 'GET',
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result).toEqual({ lat: -23.55, lon: -46.63 });
  });

  it('should fetch and map city weather data', async () => {
    fetchMock.mockResolvedValue(createResponse(weatherDataDto, 200));

    const result = await dashboardRepositoryImpl.getCityWeatherData(
      -23.55,
      -46.63,
    );

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/weather?lat=-23.55&lon=-46.63',
      expect.objectContaining({
        method: 'GET',
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result).toEqual({
      weather: weatherDataDto.weather,
      main: {
        temp: 24,
        feelsLike: 23,
      },
      cityName: 'São Paulo',
    });
  });

  it('should throw CITY_NOT_FOUND when the coordinates request returns 404', async () => {
    fetchMock.mockResolvedValue(createResponse(null, 404));

    await expect(
      dashboardRepositoryImpl.getCityCoordinates('Unknown'),
    ).rejects.toEqual(
      new DashboardError(
        'CITY_NOT_FOUND',
        'Request to /api/coordinates/Unknown failed with status 404',
      ),
    );
  });

  it('should throw UPSTREAM_ERROR when the request returns another error status', async () => {
    fetchMock.mockResolvedValue(createResponse(null, 502));

    await expect(
      dashboardRepositoryImpl.getCityWeatherData(-23.55, -46.63),
    ).rejects.toEqual(
      new DashboardError(
        'UPSTREAM_ERROR',
        'Request to /api/weather?lat=-23.55&lon=-46.63 failed with status 502',
      ),
    );
  });

  it.each(['TimeoutError', 'AbortError'])(
    'should throw TIMEOUT when fetch fails with %s',
    async (errorName) => {
      fetchMock.mockRejectedValue(new DOMException('Request timed out', errorName));

      await expect(
        dashboardRepositoryImpl.getCityCoordinates('São Paulo'),
      ).rejects.toEqual(
        new DashboardError(
          'TIMEOUT',
          'Request to /api/coordinates/S%C3%A3o%20Paulo timed out',
        ),
      );
    },
  );

  it('should throw UNKNOWN with the original error message for regular errors', async () => {
    fetchMock.mockRejectedValue(new Error('Network unavailable'));

    await expect(
      dashboardRepositoryImpl.getCityCoordinates('São Paulo'),
    ).rejects.toEqual(new DashboardError('UNKNOWN', 'Network unavailable'));
  });

  it('should throw UNKNOWN with a generic message for non-Error failures', async () => {
    fetchMock.mockRejectedValue('unexpected failure');

    await expect(
      dashboardRepositoryImpl.getCityCoordinates('São Paulo'),
    ).rejects.toEqual(
      new DashboardError('UNKNOWN', 'An unexpected error occurred'),
    );
  });
});
