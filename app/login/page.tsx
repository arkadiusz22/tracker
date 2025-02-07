import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-start gap-6 bg-background p-6 pt-10 antialiased md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={"Loading ..."}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
