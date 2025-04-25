import { render, screen, waitFor } from "@testing-library/react";
import { PublisherForm } from "./index";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<PublisherForm />", () => {
  it("should render the form", () => {
    render(<PublisherForm />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument();
  });

  it("should show error message when name is empty", async () => {
    render(<PublisherForm />);

    const submitButton = screen.getByRole("button", { name: /Adicionar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
    });
  });
});
