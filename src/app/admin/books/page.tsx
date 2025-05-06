"use client";

import { Button, Grid, IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/config/firebase";
import { deleteBook, getBooks } from "@/services/books";
import { Book } from "@/utils/interfaces/book";
import { useLoader } from "@/contexts/LoaderContext";
import { ConfirmationModal } from "@/components/confirmationModal";

export default function DashboardBookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setLoading } = useLoader();

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

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBook) {
      setLoading(true);
      await deleteBook(selectedBook.id as string);
      const updatedBooks = books.filter(
        (book: Book) => book.id !== selectedBook.id
      );
      setBooks(updatedBooks);
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
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
                    <TableCell align="right">
                      {book.authors.join(", ")}
                    </TableCell>
                    <TableCell align="right">{book.publisher}</TableCell>
                    <TableCell align="right">
                      {book.genres.join(", ")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteBook(book)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <Link href={`/admin/books/${book.id}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsModalOpen(false)}
        title={`Excluir Livro: ${selectedBook?.title}`}
      />
    </>
  );
}
