import { render, screen } from "@testing-library/react";
import { FormSearchCity } from "@/features/dashboard/ui/components/FormSearchCity";

describe("FormSearchCity component", () => {
  it("should render the search form and input configuration", () => {
    const onSubmitCityAction = jest.fn();

    const { container } = render(
      <FormSearchCity
        onSubmitCityAction={onSubmitCityAction}
        isPending={false}
      />,
    );

    expect(container.querySelector("form")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesquise a cidade")).toHaveAttribute(
      "placeholder",
      "Digite a cidade",
    );
    expect(screen.getByRole("button", { name: "icon" })).toBeInTheDocument();
  });

  it("should disable the input and search icon while pending", () => {
    const onSubmitCityAction = jest.fn();

    render(
      <FormSearchCity
        onSubmitCityAction={onSubmitCityAction}
        isPending
      />,
    );

    expect(screen.getByLabelText("Pesquise a cidade")).toBeDisabled();
    expect(screen.getByRole("button", { name: "icon" })).toBeDisabled();
  });
});
