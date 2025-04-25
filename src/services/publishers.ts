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
import { Publisher } from "@/utils/interfaces/publisher";

getAuth(app);
const db = getFirestore(app);

export function getPublishers() {
  const publishersRef = collection(db, "publishers");

  return getDocs(publishersRef).then((snapshot) => {
    const publisher = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Publisher)
    );
    return publisher;
  });
}

export async function getPublisherById(id: string) {
  const publisherRef = doc(db, "publishers", id);
  const publisherSnap = await getDoc(publisherRef);
  if (publisherSnap.exists()) {
    return { id: publisherSnap.id, ...publisherSnap.data() } as Publisher;
  } else {
    throw new Error("Publisher not found");
  }
}

export async function createPublisher(publisher: Publisher) {
  await addDoc(collection(db, "publishers"), {
    ...publisher,
  });
}

export async function updatePublisher(id: string, publisher: Publisher) {
  await setDoc(doc(db, "publishers", id), {
    ...publisher,
  });
}

export async function deletePublisher(id: string) {
  await deleteDoc(doc(db, "publishers", id));
}
