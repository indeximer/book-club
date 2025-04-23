import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from ".";

const mockSignIn = jest.fn();
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
}));

describe("<LoginForm />", () => {
  it("should render the login form", () => {
    render(<LoginForm />);
    expect(screen.getByText(/Faça seu login/i)).toBeInTheDocument();
  });

  it("calls signIn with email and password on submit", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("should show error messages for invalid input", async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/E-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/Senha é obrigatória/i)).toBeInTheDocument();
    });
  });
});
