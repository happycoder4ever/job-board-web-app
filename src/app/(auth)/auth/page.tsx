import AuthForm from "@/app/components/AuthForm";
import AuthGuard from "@/app/components/AuthGuard";

export default function AuthPage() {
  return (
    <AuthGuard>
      <AuthForm />
    </AuthGuard>
  );
}
