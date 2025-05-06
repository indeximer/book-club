"use client";

import { useParams, useRouter } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoader } from "@/contexts/LoaderContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { BookForm } from "@/components/bookForm";
import { Book } from "@/utils/interfaces/book";
import { getBookById } from "@/services/books";

export default function EditBookPage() {
  const [book, setBook] = useState<Book | null>(null);
  const { setLoading } = useLoader();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchBook = async () => {
      setLoading(true);
      const bookResponse = await getBookById(id as string);
      setBook(bookResponse);
      setLoading(false);
    };

    fetchBook();

    return () => unsubscribe();
  }, [id, setLoading, setBook]);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Gênero
          </Typography>
        </Grid>
      </Grid>
      <BookForm book={book} />
    </>
  );
}
