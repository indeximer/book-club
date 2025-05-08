"use client";

import { getBookRatingByBookId, setBookRate } from "@/services/books";
import { BookRate } from "@/utils/interfaces/book";
import { Rating } from "@mui/material";
import { log } from "console";
import { useEffect, useState } from "react";

export function BookRating({ bookId }: { bookId: string }) {
  const [value, setValue] = useState<number>(0);

  async function fetchRating() {
    const ratings = await getBookRatingByBookId(bookId);
    const totalRating = ratings.reduce(
      (acc: number, rating: BookRate) => acc + rating.rate,
      0
    );
    const averageRating = totalRating / ratings.length;

    setValue(averageRating);
  }

  useEffect(() => {
    fetchRating();
  });

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    console.log("newValue", newValue);
    const newRate = newValue || value;
    await setBookRate({ book_id: bookId, rate: newRate });
    await fetchRating();
  };

  return (
    <Rating
      name="book-rating"
      value={value}
      precision={0.5}
      size="large"
      onChange={(event: React.SyntheticEvent, newValue: number | null) =>
        handleChange(event, newValue)
      }
    />
  );
}
