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
import { getPublishers } from "@/services/publishers";
import { Publisher } from "@/utils/interfaces/publisher";

export default function DashboardPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

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

  return (
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
                    <Link href={`/admin/books/${publisher.id}`}>Editar</Link>
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
