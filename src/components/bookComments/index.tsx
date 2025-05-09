"use client";

import { useEffect, useState } from "react";
import { Heading } from "../heading";
import { Paper, Typography } from "@mui/material";
import { getBookCommentsByBookId } from "@/services/books";
import { BookComment } from "@/utils/interfaces/book";
import { useAuth } from "@/contexts/AuthContext";
import { BookCommentForm } from "../commentForm";
import { User } from "firebase/auth";

interface BookCommentsProps {
  bookTitle: string;
  bookId: string;
}

export function BookComments({ bookTitle, bookId }: BookCommentsProps) {
  const [bookComments, setBookComments] = useState<BookComment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchComments() {
      const comments = await getBookCommentsByBookId(bookId);
      setBookComments(comments);
    }

    fetchComments();
  }, [setBookComments, bookId]);

  return (
    <>
      <Heading text={`Resenhas para ${bookTitle}`} />
      {user && (
        <BookCommentForm
          bookId={bookId}
          userId={user!.uid}
          userName={user!.displayName}
        />
      )}
      {bookComments.length > 0 ? (
        bookComments.map((comment: BookComment) => (
          <Paper
            key={comment.id}
            elevation={3}
            sx={{
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" component="p">
              {comment.user_name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {comment.comment}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          Não há resenhas para este livro ainda. Seja o primeiro a escrever uma!
        </Typography>
      )}
    </>
  );
}
