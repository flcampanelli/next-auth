import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface GitHubLoginButtonProps {
  isLoading: boolean;
  callbackUrl?: string;
}

export function GitHubLoginButton({
  isLoading,
  callbackUrl = "/",
}: GitHubLoginButtonProps) {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl })}
      variant="outline"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.gitHub className="mr-2 h-4 w-4" />
      )}{" "}
      GitHub
    </Button>
  );
}
