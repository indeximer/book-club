import { object, string, ref } from "yup";

export const validationSchema = object({
  name: string().required(),
  email: string()
    .email("Você deve informar um e-mail válido")
    .required("E-mail é obrigatório"),
  password: string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: string()
    .oneOf([ref("password")], "As senhas não coincidem")
    .required("Repita a Senha é obrigatória"),
});
