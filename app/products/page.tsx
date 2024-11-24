import Image from "next/image";
import Link from "next/link";

interface IProduct {
  id: number;
  title: string;
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
    <div
      className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-max gap-10 m-10 mx-auto px-4 
        sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]"
    >
      {products.map(({ id, title, image }) => (
        <Link href={`/products/${id}`} key={id}>
          <Image
            alt={title}
            src={image}
            height={200}
            width={200}
            className="w-full object-contain aspect-square rounded-md border p-4 select-none"
          />
        </Link>
      ))}
    </div>
  );
}
