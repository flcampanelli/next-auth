import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  place: string;
}

export function EventCard({ id, image, title, date, place }: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <Card>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {date}
          </div>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {place}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
