export interface Book {
  id?: string;
  title: string;
  slug: string;
  authors: string[];
  publisher: string;
  genres: string[];
  abstract: string;
  cover: string;
}
