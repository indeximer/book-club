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
import { Genre } from "@/utils/interfaces/genre";
import { ConfirmationModal } from "@/components/confirmationModal";
import { deleteGenre, getGenres } from "@/services/genres";

export default function GenreListPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
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
      const genreResponse = await getGenres();
      setGenres(genreResponse);
    };

    fetchPublishers();

    return () => unsubscribe();
  }, [setGenres]);

  const handleDeleteGenre = (author: Genre) => {
    setSelectedGenre(author);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedGenre) {
      setLoading(true);
      await deleteGenre(selectedGenre.id as string);
      const updatedGenres = genres.filter(
        (author: Genre) => author.id !== selectedGenre.id
      );
      setGenres(updatedGenres);
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={10}>
          <Typography variant="h4" component="h2" gutterBottom>
            Gêneros
          </Typography>
        </Grid>
        <Grid size={2}>
          <Link href="/admin/genres/create">
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
                {genres.map((genre) => (
                  <TableRow key={genre.id}>
                    <TableCell component="th" scope="row">
                      {genre.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteGenre(genre)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <Link href={`/admin/genres/${genre.id}`}>
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
        title={`Excluir Editora: ${selectedGenre?.name}`}
      />
    </>
  );
}
