"use client";
import { AlertMessage } from "@/components/Auth/AlertMessage";
import { GitHubLoginButton } from "@/components/Auth/GithubLoginButton";
import { GoogleLoginButton } from "@/components/Auth/GoogleLoginButton";
import { Icons } from "@/components/Common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { useRouter } from "next/navigation";

interface UserRegisterFormProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> { }

interface IUser {
  name: string;
  email: string;
  password: string;
}

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { success, error } = await request.json();

    if (!request.ok) {
      toast({
        title: "Oops...",
        description: error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
        ),
      });
    } else {
      setSuccess(success || "");
      setTimeout(() => router.push("/login"), 2500);
    }

    setData({
      name: "",
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
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="nome"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
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
          {success && <AlertMessage title="Sucesso" message={success} type="success" />}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrar
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
        <GoogleLoginButton isLoading={isLoading} />
        <GitHubLoginButton isLoading={isLoading} />
      </div>
    </div>
  );
}
