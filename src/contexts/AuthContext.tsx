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
} from "firebase/auth";
import { auth } from "@/config/firebase";

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
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const userResponse = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(user);
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
