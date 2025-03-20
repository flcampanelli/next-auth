"use client";

import { GitHubLoginButton } from "@/components/github-login-button";
import { GoogleLoginButton } from "@/components/google-login-button";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface UserLoginFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const [data, setData] = useState<IUser>({
    email: "",
    password: "",
  });

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    // must be the same name "credentials" declared in lib/auth
    const response = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false, // avoids unnecessary reloads
      callbackUrl,
    });

    if (response?.error) {
      toast({
        title: "Oops...",
        description: response.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
        ),
      });
    } else {
      router.push(callbackUrl);
    }

    setData({
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // [e.target.name] -> input name,  e.target.value -> input value
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <GoogleLoginButton isLoading={isLoading} callbackUrl={callbackUrl} />
        <GitHubLoginButton isLoading={isLoading} callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
