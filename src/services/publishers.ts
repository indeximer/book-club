import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
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

export async function createPublisher(publisher: Publisher) {
  await addDoc(collection(db, "publishers"), {
    ...publisher,
  });
}
