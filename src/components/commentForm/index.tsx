"use client";

import { useLoader } from "@/contexts/LoaderContext";
import { setBookComment } from "@/services/books";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export interface BookCommentFormProps {
  bookId: string;
  userId: string;
  userName: string;
}

export function BookCommentForm({
  bookId,
  userId,
  userName,
}: BookCommentFormProps) {
  const [comment, setComment] = useState<string>("");
  const { setLoading } = useLoader();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const commentPayload = {
      comment: comment,
      upvotes: 0,
      user_id: userId,
      book_id: bookId,
      user_name: userName,
    };

    setLoading(true);
    await setBookComment(commentPayload);
    setComment("");
    setLoading(false);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: 2, justifyContent: "flex-end" }}
      >
        <Grid size={12}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid size={3}>
          <Button type="submit" variant="contained" fullWidth>
            Enviar Resenha
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
