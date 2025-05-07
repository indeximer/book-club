import Banner from "@/components/banner";
import bannerImage from "../../public/images/banner.jpg";
import { Section } from "@/components/section";
import { Heading } from "@/components/heading";
import { Grid } from "@mui/material";
import { getRecentBooks } from "@/services/books";
import { BookCard } from "@/components/bookCard";
import Link from "next/link";

async function fetchRecentBooks() {
  const recentBooks = await getRecentBooks();
  return recentBooks;
}

export default async function Home() {
  const recentBooks = await fetchRecentBooks();

  return (
    <>
      <Banner
        title="BookClub"
        subtitle="O seu site de livros"
        image={bannerImage}
      />
      <Section>
        <Grid container spacing={4}>
          <Grid size={12}>
            <Heading text="Novidades" />
          </Grid>
          {recentBooks &&
            recentBooks.map((book) => (
              <Grid size={3} key={book.id}>
                <Link href={`/books/${book.slug}`}>
                  <BookCard title={book.title} imgSrc={book.cover} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Section>
    </>
  );
}
