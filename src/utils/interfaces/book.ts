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

export interface BookRate {
  id?: string;
  book_id: string;
  rate: number;
}
