"use client";

import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { validationSchema } from "./validationSchema";

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={styles.container}>
      <Card sx={{ minWidth: 300, width: 400 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Faça seu login
          </Typography>

          <form
            className={styles["login-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              label="E-mail"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 1.5 }}
            />
            <TextField
              type="password"
              variant="outlined"
              label="Senha"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 1.5 }}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
