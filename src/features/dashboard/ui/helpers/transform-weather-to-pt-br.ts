export function transformWeatherToPtBr(weather: string): string {
  const normalizedWeather = weather.trim().toLowerCase();

  const weatherMap: Record<string, string> = {
    'clouds': 'Nuvens',
    'cloud': 'Nuvem',
    'rain': 'Chuva',
    'clear': 'Limpo',
    'snow': 'Neve',
  };

  return weatherMap[normalizedWeather] || normalizedWeather;
}