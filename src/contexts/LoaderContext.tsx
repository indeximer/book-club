"use client";

import { Splash } from "@/components/splash";
import { createContext, ReactNode, useContext, useState } from "react";

type LoaderProps = {
  setLoading: (loading: boolean) => void;
};

const LoaderContext = createContext<LoaderProps>({
  setLoading: (loading) => undefined,
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {loading && <Splash />}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
