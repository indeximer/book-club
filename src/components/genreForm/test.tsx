import { render, screen, waitFor } from "@testing-library/react";
import { GenreForm } from "./index";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<PublisherForm />", () => {
  it("should render the form", () => {
    render(<GenreForm />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument();
  });

  it("should show error message when name is empty", async () => {
    render(<GenreForm />);

    const submitButton = screen.getByRole("button", { name: /Salvar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
    });
  });
});
