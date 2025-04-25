"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/loginForm";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    console.log("user", user);
    if (user) {
      router.push("/");
    }
  });
  return <LoginForm />;
}
