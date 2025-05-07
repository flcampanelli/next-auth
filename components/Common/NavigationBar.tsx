"use client";

import { Icons } from "@/components/Common/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationBar() {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/logout", "/register"];

  if (noNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-1 w-full py-2 shadow-sm bg-white z-10">
      <div
        className="flex justify-between items-center px-4 mx-auto sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] 
        xl:max-w-[80rem]"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex md:mr-4 cursor-pointer font-medium">
            <Icons.fingerprint className="md:mr-2" />
            <span className="hidden md:block">Next Auth</span>
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hover:bg-transparent",
              "hover:text-gray-600",
              "text-base"
            )}
          >
            Eventos
          </Link>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hover:bg-transparent",
              "hover:text-gray-600",
              "text-base"
            )}
          >
            Produtos
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-2">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "hover:bg-gray-900/10",
                    "active:bg-gray-900/20"
                  )}
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "hover:shadow-lg",
                    "hover:shadow-gray-900/20",
                    "active:opacity-[0.85]"
                  )}
                >
                  Registrar
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image || ""}
                        alt="user avatar"
                        className="select-none"
                      />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/events/new">
                        <span>Criar Evento</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Configurações</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
