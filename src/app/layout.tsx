import type { Metadata } from "next";
import "./globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "BookClub",
  description: "Seu site de livros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
