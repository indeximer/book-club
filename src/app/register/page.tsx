import { RegisterForm } from "@/components/registerForm";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}
