import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "@/config/firebase";
import { getAuth } from "firebase/auth";
import { Author } from "@/utils/interfaces/author";

getAuth(app);
const db = getFirestore(app);

export function getAuthors() {
  const authorsRef = collection(db, "authors");

  return getDocs(authorsRef).then((snapshot) => {
    const author = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Author)
    );
    return author;
  });
}

export async function getAuthorById(id: string) {
  const authorRef = doc(db, "authors", id);
  const authorSnap = await getDoc(authorRef);
  if (authorSnap.exists()) {
    return { id: authorSnap.id, ...authorSnap.data() } as Author;
  } else {
    throw new Error("Author not found");
  }
}

export async function createAuthor(author: Author) {
  await addDoc(collection(db, "authors"), {
    ...author,
  });
}

export async function updateAuthor(id: string, author: Author) {
  await setDoc(doc(db, "authors", id), {
    ...author,
  });
}

export async function deleteAuthor(id: string) {
  await deleteDoc(doc(db, "authors", id));
}
