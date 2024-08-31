import { getCurrentUser } from "@/lib/session";
import { Icons } from "@/components/icons";
import Link from "next/link";

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
          <div className="flex items-center gap-x-1">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 font-bold text-xs text-center text-gray-900 uppercase rounded-lg select-none 
                  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none
                  disabled:opacity-50 disabled:shadow-none"
                >
                  <span>Entrar</span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 font-bold text-xs text-center text-white uppercase rounded-lg select-none 
                  transition-all bg-gradient-to-tr from-gray-900 to-gray-800 shadow-md shadow-gray-900/10 
                  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none 
                  disabled:opacity-50 disabled:shadow-none"
                >
                  <span>Registrar</span>
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/signout"
                className="px-4 py-2 font-bold text-xs text-center text-gray-900 uppercase rounded-lg select-none 
                transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none
                disabled:opacity-50 disabled:shadow-none"
              >
                <span>Sair</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
