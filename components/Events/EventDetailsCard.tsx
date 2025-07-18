import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import { CalendarIcon, Clock, MapPinIcon } from "lucide-react";
import Link from "next/link";

interface EventDetailsCardProps {
  title: string;
  logo: string;
  place: string;
  date: string;
  hour: string;
  address: string;
  organizationId: string;
}

export function EventDetailsCard({
  title,
  logo,
  date,
  hour,
  place,
  address,
  organizationId,
}: EventDetailsCardProps) {
  return (
    <Card className="sticky top-16 flex flex-col justify-around min-h-96">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent className="text-center">
        <Link href={`/organizers/${organizationId}`} className="relative h-20 w-20 rounded-full inline-block">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={logo}
              alt="user avatar"
              className="select-none object-cover"
            />
          </Avatar>
        </Link>
        <div className="mt-6 flex items-center text-sm">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date}
        </div>
        <div className="mt-2 flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {hour}
        </div>
        {place && (
          <div className="mt-2 flex items-center text-sm font-semibold">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {place}
          </div>
        )}
        <div
          className={clsx("flex text-sm text-left", {
            "items-center": place,
            "mt-2": !place,
          })}
        >
          <MapPinIcon
            className={clsx("mr-1 h-4 w-4 flex-shrink-0", {
              hidden: place,
              "mt-[2px]": !place,
            })}
          />
          <span className={clsx({ "ml-5": place })}>{address}</span>
        </div>
        <Button variant="default" className="mt-6 w-full">
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
}
