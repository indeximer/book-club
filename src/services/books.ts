import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { app } from "@/config/firebase";
import { getAuth } from "firebase/auth";
import { Book, BookComment, BookRate } from "@/utils/interfaces/book";

getAuth(app);
const db = getFirestore(app);

export function getBooks() {
  const booksRef = collection(db, "books");

  return getDocs(booksRef).then((snapshot) => {
    const books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Book)
    );
    return books;
  });
}

export function getRecentBooks() {
  const booksRef = collection(db, "books");

  const q = query(booksRef, orderBy("title", "desc"), limit(4));

  return getDocs(q).then((snapshot) => {
    const books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Book)
    );
    return books;
  });
}

export function getBookBySlug(slug: string) {
  const booksRef = collection(db, "books");

  const q = query(booksRef, where("slug", "==", slug));

  return getDocs(q).then((snapshot) => {
    const books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Book)
    );
    return books;
  });
}

export function getBookRatingByBookId(bookId: string) {
  const ratingsRef = collection(db, "ratings");

  const q = query(ratingsRef, where("book_id", "==", bookId));

  return getDocs(q).then((snapshot) => {
    const ratings = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as BookRate)
    );
    return ratings;
  });
}

export function getBookCommentsByBookId(bookId: string) {
  const commentsRef = collection(db, "comments");

  const q = query(commentsRef, where("book_id", "==", bookId));

  return getDocs(q).then((snapshot) => {
    const comments = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as BookComment)
    );
    return comments;
  });
}

export async function getBookById(id: string) {
  const bookRef = doc(db, "books", id);
  const bookSnap = await getDoc(bookRef);
  if (bookSnap.exists()) {
    return { id: bookSnap.id, ...bookSnap.data() } as Book;
  } else {
    throw new Error("Book not found");
  }
}

export async function createBook(book: Book) {
  await addDoc(collection(db, "books"), {
    ...book,
  });
}

export async function setBookRate(bookRate: BookRate) {
  await addDoc(collection(db, "ratings"), {
    ...bookRate,
  });
}

export async function setBookComment(bookComment: BookComment) {
  await addDoc(collection(db, "comments"), {
    ...bookComment,
  });
}

export async function updateBook(id: string, book: Book) {
  await setDoc(doc(db, "books", id), {
    ...book,
  });
}

export async function deleteBook(id: string) {
  await deleteDoc(doc(db, "books", id));
}
