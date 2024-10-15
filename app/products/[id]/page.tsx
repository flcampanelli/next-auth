"use client";

import ProductSkeleton from "@/components/product-skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProduct(id: number): Promise<IProduct> {
  const request = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await request.json();

  return data;
}

export default function ProductDetail({ params }: { params: { id: number } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      const productData = await getProduct(params.id);
      setProduct(productData);
    }

    fetchProduct();
  }, [params.id]);

  if (!product) return <ProductSkeleton />;

  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative w-full h-0 pb-[100%]">
                <Image
                  src={
                    product.image ||
                    "https://placehold.co/400x400?text=Product%20Image"
                  }
                  alt={product.title}
                  className="w-full h-auto object-contain rounded-lg"
                  fill
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    starValue <= Math.floor(product.rating.rate)
                      ? "fill-primary"
                      : "fill-muted"
                  }`}
                />
              );
            })}
            <span className="text-sm text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-sm lg:text-base text-muted-foreground">
            <p>{product.description}</p>
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full">Add to Cart</Button>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{product.category}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
