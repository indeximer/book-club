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

export interface BookComment {
  id?: string;
  book_id: string;
  comment: string;
  user_id: string;
  user_name: string;
  upvotes: number;
}
