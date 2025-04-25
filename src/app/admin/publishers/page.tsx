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
import { deletePublisher, getPublishers } from "@/services/publishers";
import { useLoader } from "@/contexts/LoaderContext";
import { Publisher } from "@/utils/interfaces/publisher";
import { ConfirmationModal } from "@/components/confirmationModal";

export default function DashboardPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(
    null
  );
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
      const publishersResponse = await getPublishers();
      setPublishers(publishersResponse);
    };

    fetchPublishers();

    return () => unsubscribe();
  }, [setPublishers]);

  const handleDeletePublisher = (publisher: Publisher) => {
    setSelectedPublisher(publisher);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedPublisher) {
      setLoading(true);
      await deletePublisher(selectedPublisher.id as string);
      const updatedPublishers = publishers.filter(
        (publisher) => publisher.id !== selectedPublisher.id
      );
      setPublishers(updatedPublishers);
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={10}>
          <Typography variant="h4" component="h2" gutterBottom>
            Editoras
          </Typography>
        </Grid>
        <Grid size={2}>
          <Link href="/admin/publishers/create">
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
                {publishers.map((publisher) => (
                  <TableRow key={publisher.id}>
                    <TableCell component="th" scope="row">
                      {publisher.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeletePublisher(publisher)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <Link href={`/admin/publishers/${publisher.id}`}>
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
        title={`Excluir Editora: ${selectedPublisher?.name}`}
      />
    </>
  );
}
