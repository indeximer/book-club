"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

import { auth } from "@/config/firebase";
import { useLoader } from "./LoaderContext";

type AuthProps = {
  user: {} | null;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthProps>({
  user: null,
  signIn: (email: string, password: string) => undefined,
  signUp: (name: string, email: string, password: string) => undefined,
  logOut: () => undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { setLoading } = useLoader();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    router.push("/");
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
    router.push("/");
  };

  const signUp = async (name: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    updateProfile(auth.currentUser!, {
      displayName: name,
    });
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
