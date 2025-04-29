"use client";

import { useParams, useRouter } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoader } from "@/contexts/LoaderContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Genre } from "@/utils/interfaces/genre";
import { getGenreById } from "@/services/genres";
import { GenreForm } from "@/components/genreForm";

export default function EditGenrePage() {
  const [genre, setGenre] = useState<Genre | null>(null);
  const { setLoading } = useLoader();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchGenre = async () => {
      setLoading(true);
      const genreResponse = await getGenreById(id as string);
      setGenre(genreResponse);
      setLoading(false);
    };

    fetchGenre();

    return () => unsubscribe();
  }, [id, setLoading, setGenre]);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Gênero
          </Typography>
        </Grid>
      </Grid>
      <GenreForm genre={genre} />
    </>
  );
}
