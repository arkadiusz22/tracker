import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export function SignOutButton() {
  return (
    <Button
      onClick={async () => {
        "use server";
        try {
          await signOut({ redirect: false });
        } catch (err) {
          if (isRedirectError(err)) {
            console.error(err);
            throw err;
          }
        } finally {
          redirect("/login");
        }
      }}
    >
      Sign out
    </Button>
  );
}
