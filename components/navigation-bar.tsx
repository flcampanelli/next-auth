import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function NavigationBar() {
  const user = await getCurrentUser();

  return (
    <nav
      className="sticky top-0 z-1 w-full px-4 py-2 lg:px-8 lg:py-3 shadow-sm border border-white/80 bg-opacity-80 
      backdrop-blur-2xl backdrop-saturate-200"
    >
      <div
        className="flex justify-between items-center px-4 mx-auto sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] 
        xl:max-w-[80rem]"
      >
        <Link href="/" className="flex mr-4 cursor-pointer font-medium">
          <Icons.fingerprint className="mr-2" />
          Next Auth
        </Link>
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
                        src={user.image ? user.image : ""}
                        alt="user avatar"
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
                    <DropdownMenuItem>
                      <span>Perfil</span>
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
