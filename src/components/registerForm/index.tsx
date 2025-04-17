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

import { useAuth } from "@/contexts/AuthContext";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = ({ name, email, password }) =>
    signUp(name, email, password);

  return (
    <section className={styles.container}>
      <Card sx={{ minWidth: 300, width: 400 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Registre-se
          </Typography>

          <form
            className={styles["login-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              label="Nome"
              {...register("name")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 1.5 }}
            />
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
            <TextField
              type="password"
              variant="outlined"
              label="Repita a Senha"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
