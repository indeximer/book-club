import { PublisherForm } from "@/components/publisherForm";
import { Grid, Typography } from "@mui/material";

export default function CreatePublisherPage() {
  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Adicionar Editora
          </Typography>
        </Grid>
      </Grid>
      <PublisherForm />
    </>
  );
}
