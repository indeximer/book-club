import { render, screen } from "@testing-library/react";
import { RegisterForm } from ".";
import userEvent from "@testing-library/user-event";

const mockSignUp = jest.fn();
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    signUp: mockSignUp,
  }),
}));

describe("<RegisterForm />", () => {
  it("should render the register form", () => {
    render(<RegisterForm />);
    expect(screen.getByText(/Crie sua conta/i)).toBeInTheDocument();
  });

  it("calls signUp with email and password on submit", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });
    const nameInput = screen.getByLabelText(/nome/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(emailInput, "teste@mail.com");
    await userEvent.type(passwordInput, "senha123");
    await userEvent.type(nameInput, "Teste");
    await userEvent.type(confirmPasswordInput, "senha123");
    await userEvent.click(submitButton);

    expect(mockSignUp).toHaveBeenCalledWith(
      "Teste",
      "teste@mail.com",
      "senha123"
    );
  });

  it("should show error messages for invalid input", async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    userEvent.click(submitButton);

    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/E-mail é obrigatório/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/A senha deve ter ao menos 8 caracteres/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Confirmar senha é obrigatório/i)
    ).toBeInTheDocument();
  });
});
