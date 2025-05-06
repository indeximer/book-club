"use client";

import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { useLoader } from "@/contexts/LoaderContext";
import { Book } from "@/utils/interfaces/book";
import { createBook, updateBook } from "@/services/books";
import { getPublishers } from "@/services/publishers";
import { getAuthors } from "@/services/authors";
import { getGenres } from "@/services/genres";

type Inputs = {
  title: string;
  slug: string;
  cover: FileList;
  publisher: string;
  authors: string[];
  genres: string[];
  abstract: string;
};

type BookFormProps = {
  book?: Book | null;
};

export function BookForm({ book = null }: BookFormProps) {
  const [authorsOptions, setAuthorsOptions] = useState<string[]>([]);
  const [genresOptions, setGenresOptions] = useState<string[]>([]);
  const [publishersOptions, setPublishersOptions] = useState<string[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const authorsData = await getAuthors();
      const genresData = await getGenres();
      const publishersData = await getPublishers();

      const authors = authorsData.map((author) => author.name);
      const genres = genresData.map((genre) => genre.name);
      const publishers = publishersData.map((publisher) => publisher.name);

      setAuthorsOptions(authors);
      setGenresOptions(genres);
      setPublishersOptions(publishers);
      setLoading(false);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    slug,
    cover,
    authors,
    genres,
    publisher,
    abstract,
  }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", cover[0]);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );
    const coverResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const coverData = await coverResponse.json();
    const coverUrl = coverData.secure_url;

    if (book?.id) {
      await updateBook(book.id, {
        title,
        slug,
        cover: coverUrl,
        authors,
        genres,
        publisher,
        abstract,
      });
      setLoading(false);
      router.push("/admin/books");
      return;
    }

    await createBook({
      title,
      slug,
      cover: coverUrl,
      authors,
      genres,
      publisher,
      abstract,
    });
    setLoading(false);
    router.push("/admin/books");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={3}
        sx={{ justifyContent: "end" }}
      >
        <Grid size={6}>
          <TextField
            defaultValue={book?.title ? book.title : ""}
            focused={!!book?.title}
            variant="outlined"
            label="Título"
            {...register("title")}
            onChange={(e) => {
              setValue("slug", slugify(e.target.value, { lower: true }));
            }}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={book?.slug || ""}
            variant="outlined"
            label="Slug"
            {...register("slug")}
            error={!!errors.slug}
            helperText={errors.slug?.message}
            focused
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            type="file"
            defaultValue={book?.cover ? book.cover : ""}
            variant="outlined"
            label="Capa"
            {...register("cover")}
            error={!!errors.cover}
            helperText={errors.cover?.message}
            focused
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="publisher"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Autocomplete
                options={publishersOptions}
                getOptionLabel={(option) => option}
                value={book?.publisher || ""}
                onChange={(_, data) => {
                  onChange(data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Editora"
                    placeholder="Selecione a editora"
                    error={!!errors.publisher}
                    helperText={errors.publisher?.message}
                    focused={!!book?.publisher}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="authors"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Autocomplete
                multiple
                options={authorsOptions}
                getOptionLabel={(option) => option}
                value={book?.authors || []}
                onChange={(_, data) => {
                  onChange(data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Autores"
                    placeholder="Selecione os autores"
                    error={!!errors.authors}
                    helperText={errors.authors?.message}
                    focused={book?.authors && book?.authors.length > 0}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="genres"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Autocomplete
                multiple
                options={genresOptions}
                getOptionLabel={(option) => option}
                value={book?.genres || []}
                onChange={(_, data) => {
                  onChange(data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Gêneros"
                    placeholder="Selecione os gêneros"
                    error={!!errors.genres}
                    helperText={errors.genres?.message}
                    focused={book?.genres && book?.genres.length > 0}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            defaultValue={book?.abstract ? book.abstract : ""}
            focused={!!book?.abstract}
            variant="outlined"
            label="Resumo"
            {...register("abstract")}
            error={!!errors.abstract}
            helperText={errors.abstract?.message}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid size={4}>
          <Button variant="contained" type="submit" size="large" fullWidth>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
