import ClientComponentAuth from "@/components/client-component-auth";
import ServerComponentAuth from "@/components/server-component-auth";

export default async function Home() {
  return (
    <section className="h-screen flex items-center justify-center">
      <ClientComponentAuth />
      <ServerComponentAuth />
    </section>
  );
}
