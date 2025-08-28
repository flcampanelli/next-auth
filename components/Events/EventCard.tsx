import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  id: string;
  banner: string;
  title: string;
  date: string;
  place: string;
}

export function EventCard({ id, banner, title, date, place }: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <Card className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={banner || "https://placehold.co/400x400?text=Event%20Banner"}
              alt={title}
              fill
              className="object-cover rounded-t-md"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow justify-between">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {date}
            </div>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <MapPinIcon className="mr-1 h-4 w-4" />
              {place}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
