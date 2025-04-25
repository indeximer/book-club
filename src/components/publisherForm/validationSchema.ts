import { object, string } from "yup";

export const validationSchema = object({
  name: string().required("Nome é obrigatório"),
  slug: string().required("Slug é obrigatório"),
});
