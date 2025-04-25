"use client";

import { Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { createPublisher, updatePublisher } from "@/services/publishers";
import { useLoader } from "@/contexts/LoaderContext";
import { Publisher } from "@/utils/interfaces/publisher";

type Inputs = {
  name: string;
  slug: string;
};

type PublisherFormProps = {
  publisher?: Publisher | null;
};

export function PublisherForm({ publisher = null }: PublisherFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const { setLoading } = useLoader();

  const name = watch("name") || "";

  useEffect(() => {
    const slug = slugify(name, { lower: true });
    setValue("slug", slug);
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ name, slug }) => {
    setLoading(true);
    if (publisher?.id) {
      await updatePublisher(publisher.id, { name, slug });
      setLoading(false);
      router.push("/admin/publishers");
      return;
    }

    await createPublisher({ name, slug });
    setLoading(false);
    router.push("/admin/publishers");
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
            defaultValue={publisher?.name ? publisher.name : ""}
            focused={!!publisher?.name}
            variant="outlined"
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={publisher?.slug || ""}
            variant="outlined"
            label="Slug"
            {...register("slug")}
            error={!!errors.slug}
            helperText={errors.slug?.message}
            focused
            fullWidth
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
