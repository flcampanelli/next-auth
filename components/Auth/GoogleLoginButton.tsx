import { Icons } from "@/components/Common/Icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface GoogleLoginButtonProps {
  isLoading: boolean;
  callbackUrl?: string;
}

export function GoogleLoginButton({
  isLoading,
  callbackUrl = "/",
}: GoogleLoginButtonProps) {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl })}
      variant="outline"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  );
}
