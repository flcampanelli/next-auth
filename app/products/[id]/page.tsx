interface ProductProps {
  params: {
    id: string;
  };
}

async function getProductById(productId: string) {
  const request = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const data = await request.json();
  return data;
}

export default async function Product({ params }: ProductProps) {
  const product = await getProductById(params.id);

  return <>{JSON.stringify(product)}</>;
}
