"use client";

import { useParams, useRouter } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoader } from "@/contexts/LoaderContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Author } from "@/utils/interfaces/author";
import { getAuthorById } from "@/services/authors";
import { AuthorForm } from "@/components/authorForm";

export default function EditAuthorPage() {
  const [author, setAuthor] = useState<Author | null>(null);
  const { setLoading } = useLoader();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchAuthor = async () => {
      setLoading(true);
      const authorResponse = await getAuthorById(id as string);
      setAuthor(authorResponse);
      setLoading(false);
    };

    fetchAuthor();

    return () => unsubscribe();
  }, [id, setLoading, setAuthor]);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Autor
          </Typography>
        </Grid>
      </Grid>
      <AuthorForm author={author} />
    </>
  );
}
