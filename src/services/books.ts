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
} from "firebase/firestore";
import { app } from "@/config/firebase";
import { getAuth } from "firebase/auth";
import { Book } from "@/utils/interfaces/book";

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

export async function updateBook(id: string, book: Book) {
  await setDoc(doc(db, "books", id), {
    ...book,
  });
}

export async function deleteBook(id: string) {
  await deleteDoc(doc(db, "books", id));
}
