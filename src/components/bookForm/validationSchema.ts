import { array, mixed, object, string } from "yup";

export const validationSchema = object({
  title: string().required("Título é obrigatório"),
  slug: string().required("Slug é obrigatório"),
  cover: mixed<FileList>()
    .test(
      "required",
      "Selecione uma capa",
      // @ts-ignore
      (files: FileList) => files?.length > 0
    )
    .required("Selecione uma capa"),
  authors: array()
    .of(string().required("Autor é obrigatório"))
    .min(1, "Selecione pelo menos um autor")
    .required("Autor é obrigatório"),
  publisher: string().required("Editora é obrigatória"),
  genres: array()
    .of(string().required("Gênero é obrigatório"))
    .min(1, "Selecione pelo menos um gênero")
    .required("Gênero é obrigatório"),
  abstract: string().required("Resumo é obrigatório"),
});
