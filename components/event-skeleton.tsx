import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventSkeleton() {
  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
        <div className="col-span-3 order-2 lg:order-1">
          <div className="relative w-full h-96">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <Skeleton className="mt-8 w-52 h-8" />
          <div className="mt-6">
            <Skeleton className="mt-6 w-1/2 h-4" />
            <Skeleton className="mt-12 w-3/4 h-4" />
            <Skeleton className="mt-6 w-4/5 h-4" />
            <Skeleton className="mt-6 w-1/2 h-4" />
            <Skeleton className="mt-6 w-3/4 h-4" />
            <Skeleton className="mt-12 w-3/4 h-4" />
          </div>
        </div>
        <div className="col-span-1 order-1 lg:order-2">
          <Card className="sticky top-16">
            <CardHeader>
              <Skeleton className="w-full h-7" />
              <Skeleton className="w-11/12 h-7 mx-auto" />
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-full flex justify-center">
                <Skeleton className="w-20 h-20 rounded-full" />
              </div>
              <Skeleton className="mt-6 w-3/4 h-4" />
              <Skeleton className="mt-2 w-2/5 h-4" />
              <Skeleton className="mt-2 w-3/5 h-4" />
              <Skeleton className=" mt-2 w-full h-8" />
              <Skeleton className=" mt-6 w-full h-10" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
