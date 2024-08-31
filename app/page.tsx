import { NavigationBar } from "@/components/navigation-bar";
import ClientComponentAuth from "@/components/client-component-auth";
import ServerComponentAuth from "@/components/server-component-auth";

export default async function Home() {
  return (
    <>
      <NavigationBar />
      <section className="flex flex-col lg:flex-row items-center justify-center h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        <ClientComponentAuth />
        <ServerComponentAuth />
      </section>
    </>
  );
}
