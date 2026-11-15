import { CityWeatherError } from "@/src/features/dashboard/ui/components/CityWeatherError";
import { render, screen } from "@testing-library/react";

describe('CityWeatherError component', () => {
  it('should render the component correctly with the error message', () => {
    const errorMessage = 'Erro ao buscar o clima';

    render(<CityWeatherError message={errorMessage} />);

    const messageElement = screen.getByText(errorMessage);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2 })
    ).toHaveTextContent('Não foi possível mostrar o clima 🫤');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-[#a3a6a8]');
  })
})