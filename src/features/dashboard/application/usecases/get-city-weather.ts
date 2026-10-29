import { DashboardRepository } from '@/features/dashboard/domain/repositories/dashboard.repository';
import { DashboardError, DashboardErrorCode } from '@/features/dashboard/domain/errors/dashboard.error';
import { CityWeatherEntity } from '@/features/dashboard/domain/entities/city-weather.entity';
import { getCityCoordinatesUseCase } from './get-city-coordinates';
import { getCityWeatherDataUseCase } from './get-city-weather-data';

export type CityWeatherResult =
  | { status: 'success'; data: CityWeatherEntity }
  | { status: 'error'; code: DashboardErrorCode };

export async function getCityWeatherUseCase(
  repository: DashboardRepository, 
  city: string
): Promise<CityWeatherResult> {
  try {
    const { lat, lon } = await getCityCoordinatesUseCase(repository, city);

    const weatherData = await getCityWeatherDataUseCase(repository, { lat, lon });
    const weather = weatherData.weather[0];

    if (!weather) {
      return { status: 'error', code: 'UPSTREAM_ERROR' };
    }

    return {
      status: 'success',
      data: {
        weather,
        main: weatherData.main,
        cityName: weatherData.cityName
      }
    };
  } catch (error) {
    if (error instanceof DashboardError) {
      return { status: 'error', code: error.code };
    }

    return { status: 'error', code: 'UNKNOWN' };
  }
}
