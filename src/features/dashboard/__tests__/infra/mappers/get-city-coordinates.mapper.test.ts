import { getCityCoordinatesMapper } from '@/features/dashboard/infra/mappers/get-city-coordinates.mapper';
import { GetCityCoordinatesDTO } from '@/features/dashboard/infra/dtos/get-city-coordinates.dto';

describe('getCityCoordinatesMapper', () => {
  it('should map coordinates from the DTO to the domain entity', () => {
    const dto: GetCityCoordinatesDTO = {
      name: 'São Paulo',
      lat: -23.55,
      lon: -46.63,
      country: 'BR',
    };

    expect(getCityCoordinatesMapper.toDomain(dto)).toEqual({
      lat: -23.55,
      lon: -46.63,
    });
  });

  it('should use zero when coordinates are missing', () => {
    const dto = {
      name: 'São Paulo',
      lat: null,
      lon: undefined,
      country: 'BR',
    } as unknown as GetCityCoordinatesDTO;

    expect(getCityCoordinatesMapper.toDomain(dto)).toEqual({
      lat: 0,
      lon: 0,
    });
  });
});
