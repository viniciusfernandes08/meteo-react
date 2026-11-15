import { Input } from "@/src/features/dashboard/ui/components/Input";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeIcon } from "lucide-react";

describe('Input component', () => {
  it('should render the input with the correct label', () => {
    render(<Input label="Nome" name="test-name" />);
    const labelElement = screen.getByText('Nome');
    expect(labelElement).toBeInTheDocument();
  })

  it('should apply the correct styles to label', () => {
    render(<Input label="Nome" name="test-name" classNameLabel="text-white" />);
    const labelElement = screen.getByText('Nome');
    expect(labelElement).toHaveClass('text-white');
  })

  it('should synchronize the label with the input using htmlFor attribute', () => {
    render(<Input id="test-id" label="Nome" name="test-name" />);
    const labelElement = screen.getByText('Nome');
    const inputElement = screen.getByRole('textbox');
    expect(labelElement).toHaveAttribute('for', 'test-id');
    expect(inputElement).toHaveAttribute('id', 'test-id');
    expect(inputElement).toHaveAttribute('name', 'test-name');
  })

  it('should render the icon on the left when iconPosition is "left" and apply the correct styles', () => {
    render(
      <Input 
        icon={<HomeIcon data-testid="icon-home" />} 
        iconPosition="left"
        iconClasses= "text-blue-500"
        name="test-name"
      />
    );

    const iconElement = screen.getByTestId('icon-home');
    expect(iconElement.parentElement).toHaveClass('text-blue-500');
  })

  it('should render the icon on the right when iconPosition is "right" and apply the correct styles', () => {
    render(
      <Input 
        icon={<HomeIcon data-testid="icon-home" />} 
        iconPosition="right"
        iconClasses= "text-blue-500"
        name="test-name"
      />
    );

    const iconElement = screen.getByTestId('icon-home');
    expect(iconElement.parentElement).toHaveClass('text-blue-500');
  })

  it('should call onClickIcon when the icon is clicked', async () => {
    const onClickIcon = jest.fn();
    const user = userEvent.setup();

    render(
      <Input
        icon={<HomeIcon data-testid="icon-home" />}
        iconPosition="right"
        name="test-name"
        onClickIcon={onClickIcon}
      />
    );

    await user.click(screen.getByRole('button', { name: 'icon' }));

    expect(onClickIcon).toHaveBeenCalledTimes(1);
  })

  it('should not call onClickIcon when the icon is disabled', async () => {
    const onClickIcon = jest.fn();
    const user = userEvent.setup();

    render(
      <Input
        disabled
        icon={<HomeIcon data-testid="icon-home" />}
        iconPosition="right"
        name="test-name"
        onClickIcon={onClickIcon}
      />
    );

    const iconButton = screen.getByRole('button', { name: 'icon' });
    expect(iconButton).toBeDisabled();

    await user.click(iconButton);

    expect(onClickIcon).not.toHaveBeenCalled();
  })

  it('should apply className to the input container', () => {
    const { container } = render(
      <Input name="test-name" className="gap-4" />
    );

    expect(container.querySelector('.gap-4')).toBeInTheDocument();
  })

  it('should not render a label when label is not provided', () => {
    render(<Input name="test-name" />);

    expect(screen.queryByText('Nome')).not.toBeInTheDocument();
  })

  it('should not render an icon when iconPosition is not provided', () => {
    render(
      <Input
        icon={<HomeIcon data-testid="icon-home" />}
        name="test-name"
      />
    );

    expect(screen.queryByTestId('icon-home')).not.toBeInTheDocument();
  })

  it('should render the input with the correct id', () => {
    render(<Input id="test-id" name="test-name" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('id', 'test-id');
  })

  it('should render the input with the correct type', () => {
    render(<Input placeholder="Digite aqui" name="test-name" type="text" />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toHaveAttribute('type', 'text');
  })

  it('should render the input with the correct name', () => {
    render(<Input placeholder="Digite aqui" name="test-name" />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toHaveAttribute('name', 'test-name');
  })

  it('should render the input with the correct ref', () => {
    const ref = { current: null };
    render(<Input placeholder="Digite aqui" name="test-name" ref={ref} />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toBe(ref.current);
  })

  it('should apply the correct styles to input', () => {
    render(<Input placeholder="Digite aqui" name="test-name" classNameInput="bg-gray-200" />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toHaveClass('bg-gray-200');
  })

  it('should render the input with the correct placeholder', () => {
    render(<Input placeholder="Digite aqui" name="test-name" />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toBeInTheDocument();
  })

  it('should render the input with the correct maxLength', () => {
    render(<Input placeholder="Digite aqui" name="test-name" maxLength={10} />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toHaveAttribute('maxLength', '10');
  })

  it('should disable the input when disabled prop is true', () => {
    render(<Input placeholder="Digite aqui" name="test-name" disabled />);
    const inputElement = screen.getByPlaceholderText('Digite aqui');
    expect(inputElement).toBeDisabled();
  })
})