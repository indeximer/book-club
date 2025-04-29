"use client";

import { auth } from "@/config/firebase";
import { Grid, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookForm } from "@/components/bookForm";

export default function CreateBookPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Adicionar Livro
          </Typography>
        </Grid>
      </Grid>
      <BookForm />
    </>
  );
}
