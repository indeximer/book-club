import { render, screen, waitFor } from "@testing-library/react";
import { BookForm } from "./index";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<PublisherForm />", () => {
  it("should render the form", () => {
    render(<BookForm />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument();
  });

  it("should show error message when name is empty", async () => {
    render(<BookForm />);

    const submitButton = screen.getByRole("button", { name: /Salvar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Título é obrigatório/i)).toBeInTheDocument();
    });
  });
});
