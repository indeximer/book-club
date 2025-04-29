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
import { Genre } from "@/utils/interfaces/genre";

getAuth(app);
const db = getFirestore(app);

export function getGenres() {
  const genresRef = collection(db, "genres");

  return getDocs(genresRef).then((snapshot) => {
    const genres = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Genre)
    );
    return genres;
  });
}

export async function getGenreById(id: string) {
  const genreRef = doc(db, "genres", id);
  const genreSnap = await getDoc(genreRef);
  if (genreSnap.exists()) {
    return { id: genreSnap.id, ...genreSnap.data() } as Genre;
  } else {
    throw new Error("Genre not found");
  }
}

export async function createGenre(genre: Genre) {
  await addDoc(collection(db, "genres"), {
    ...genre,
  });
}

export async function updateGenre(id: string, genre: Genre) {
  await setDoc(doc(db, "genres", id), {
    ...genre,
  });
}

export async function deleteGenre(id: string) {
  await deleteDoc(doc(db, "genres", id));
}
