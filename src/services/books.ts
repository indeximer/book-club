import { getFirestore, collection, getDocs } from "firebase/firestore";
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
