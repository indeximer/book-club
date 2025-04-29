"use client";

import { Button, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/config/firebase";
import { getBooks } from "@/services/books";
import { Book } from "@/utils/interfaces/book";

export default function DashboardBookPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchBooks = async () => {
      const booksResponse = await getBooks();
      setBooks(booksResponse);
    };

    fetchBooks();

    return () => unsubscribe();
  }, [setBooks]);

  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      <Grid size={10}>
        <Typography variant="h4" component="h2" gutterBottom>
          Livros
        </Typography>
      </Grid>
      <Grid size={2}>
        <Link href="/admin/books/create">
          <Button variant="contained" size="large" sx={{ width: "100%" }}>
            Adicionar
          </Button>
        </Link>
      </Grid>
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="right">Autor</TableCell>
                <TableCell align="right">Editora</TableCell>
                <TableCell align="right">Gênero</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell component="th" scope="row">
                    {book.title}
                  </TableCell>
                  <TableCell align="right">{book.authors.join(", ")}</TableCell>
                  <TableCell align="right">{book.publisher}</TableCell>
                  <TableCell align="right">{book.genres.join(", ")}</TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/books/${book.id}`}>Editar</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
