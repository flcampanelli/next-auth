import { Metadata } from "next";
import { Suspense } from "react";

import { Command } from "lucide-react";
import Link from "next/link";

import { AuthButton } from "@/components/Auth/AuthButton";
import { UserLoginForm } from "@/components/Auth/UserLoginForm";
import { UserLoginFormSkeleton } from "@/components/Auth/UserLoginFormSkeleton";

export const metadata: Metadata = {
  title: "Autenticação",
  description:
    "Autenticação utilizando shadcn-ui, next-auth (authjs), prisma e nextjs 13.4+",
};

export default async function Login() {
  return (
    <div className="container relative py-48 md:py-0  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthButton page="login" />
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="mr-2 h-6 w-6" /> Login
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <footer className="text-sm"></footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
            <p className="text-sm text-muted-foreground">
              Entre com seus dados de Login
            </p>
          </div>
          <Suspense fallback={<UserLoginFormSkeleton />}>
            <UserLoginForm />
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
