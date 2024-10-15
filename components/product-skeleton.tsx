import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative w-full h-0 pb-[100%]">
                <Skeleton className="w-full aspect-square rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Skeleton className="w-3/4 h-9" />
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-full" />
            ))}
            <Skeleton className="w-8 h-4" />
          </div>
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
          <div className="space-y-4">
            <div>
              <Skeleton className="w-16 h-4 mb-2" />
              <div className="flex items-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-11 h-11" />
                ))}
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger>
                <Skeleton className="w-24 h-6" />
              </AccordionTrigger>
              <AccordionContent>
                <Skeleton className="w-36 h-4" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
