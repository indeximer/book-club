"use client";

import { useParams, useRouter } from "next/navigation";
import { PublisherForm } from "@/components/publisherForm";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPublisherById } from "@/services/publishers";
import { useLoader } from "@/contexts/LoaderContext";
import { Publisher } from "@/utils/interfaces/publisher";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function EditPublisherPage() {
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const { setLoading } = useLoader();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    const fetchPublisher = async () => {
      setLoading(true);
      const publisherResponse = await getPublisherById(id as string);
      setPublisher(publisherResponse);
      setLoading(false);
    };

    fetchPublisher();

    return () => unsubscribe();
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
