"use client";

import { Button, Grid, Typography, IconButton } from "@mui/material";
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
import { useLoader } from "@/contexts/LoaderContext";
import { Author } from "@/utils/interfaces/author";
import { ConfirmationModal } from "@/components/confirmationModal";
import { deleteAuthor, getAuthors } from "@/services/authors";

export default function AuthorListPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setLoading } = useLoader();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchPublishers = async () => {
      const authorsResponse = await getAuthors();
      setAuthors(authorsResponse);
    };

    fetchPublishers();

    return () => unsubscribe();
  }, [setAuthors]);

  const handleDeleteAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAuthor) {
      setLoading(true);
      await deleteAuthor(selectedAuthor.id as string);
      const updatedAuthors = authors.filter(
        (author: Author) => author.id !== selectedAuthor.id
      );
      setAuthors(updatedAuthors);
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={10}>
          <Typography variant="h4" component="h2" gutterBottom>
            Autores
          </Typography>
        </Grid>
        <Grid size={2}>
          <Link href="/admin/authors/create">
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
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authors.map((author) => (
                  <TableRow key={author.id}>
                    <TableCell component="th" scope="row">
                      {author.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteAuthor(author)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <Link href={`/admin/authors/${author.id}`}>
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
        title={`Excluir Editora: ${selectedAuthor?.name}`}
      />
    </>
  );
}
