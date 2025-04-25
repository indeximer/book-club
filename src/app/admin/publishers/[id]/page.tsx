"use client";

import { useParams } from "next/navigation";
import { PublisherForm } from "@/components/publisherForm";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPublisherById } from "@/services/publishers";
import { useLoader } from "@/contexts/LoaderContext";
import { Publisher } from "@/utils/interfaces/publisher";

export default function EditPublisherPage() {
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const { setLoading } = useLoader();
  const { id } = useParams();

  useEffect(() => {
    const fetchPublisher = async () => {
      setLoading(true);
      const publisherResponse = await getPublisherById(id as string);
      setPublisher(publisherResponse);
      setLoading(false);
    };

    fetchPublisher();
  }, [id, setLoading]);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Editora
          </Typography>
        </Grid>
      </Grid>
      <PublisherForm publisher={publisher} />
    </>
  );
}
