import { BookPortrait } from "@/components/bookPortrait";
import { BookRating } from "@/components/bookRating";
import { Section } from "@/components/section";
import { getBookBySlug } from "@/services/books";
import { Book } from "@/utils/interfaces/book";
import { Grid } from "@mui/material";
import { BookAbstract } from "@/components/bookAbstract";
import { BookComments } from "@/components/bookComments";

async function fetchBook(slug: string) {
  const Books: Book[] = await getBookBySlug(slug);
  return Books[0];
}

export default async function BookPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const book = await fetchBook(slug);

  return (
    <Section>
      <Grid container spacing={4}>
        <Grid size={2}>
          <BookPortrait book={book} />
          <BookRating bookId={book.id!} />
        </Grid>
        <Grid size={10}>
          <BookAbstract title={book.title} abstract={book.abstract} />
          <BookComments bookTitle={book.title} bookId={book.id!} />
        </Grid>
      </Grid>
    </Section>
  );
}
