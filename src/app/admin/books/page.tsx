import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function DashboardPage() {
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
    </Grid>
  );
}
