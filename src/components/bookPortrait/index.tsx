import { Book } from "@/utils/interfaces/book";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";

export function BookPortrait({ book }: { book: Book }) {
  return (
    <div>
      <Image
        src={book.cover}
        alt={book.title}
        width={300}
        height={450}
        priority={true}
        className={styles.cover}
      />
      <Typography variant="h6" component="h1" gutterBottom>
        {book.title}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {book.authors.join(", ")}
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        {book.publisher}
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        {book.genres.join(", ")}
      </Typography>
    </div>
  );
}
