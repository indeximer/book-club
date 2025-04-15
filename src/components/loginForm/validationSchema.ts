import { object, string } from "yup";

export const validationSchema = object({
  email: string()
    .email("Você deve informar um e-mail válido")
    .required("E-mail é obrigatório"),
  password: string().required("Senha é obrigatória"),
});
