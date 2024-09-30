import { NavigationBar } from "@/components/navigation-bar";
import Link from "next/link";
import Image from "next/image";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

async function getProducts(): Promise<IProduct[]> {
  const request = await fetch("https://fakestoreapi.com/products");
  const data = await request.json();
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <NavigationBar />
      <div
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-max gap-10 m-10 mx-auto px-4 
        sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]"
      >
        {products.map(({ id, title, price, description, image }) => (
          <Link href={`/products/${id}`} key={id}>
            <Image
              alt={title}
              src={image}
              height={150}
              width={150}
              className="w-full object-cover aspect-square rounded-md border p-4"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
