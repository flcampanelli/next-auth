"use client";

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
import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <Image
                src="https://placehold.co/400x400?text=Product%20Image"
                alt="Product Image"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Product Name</h1>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary" />
            ))}
            <span className="text-sm text-muted-foreground">(120 reviews)</span>
          </div>
          <p className="text-xl font-semibold">$199.99</p>
          <p className="text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet. Et voluptas optio ut nulla numquam est
              error nesciunt quo exercitationem dolorem vel deserunt quisquam.
              Id consequatur iure ut inventore optio hic veritatis explicabo!
            </p>
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
                  <li>item 1</li>
                  <li>item 2</li>
                  <li>item 3</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
