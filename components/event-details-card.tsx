import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPinIcon } from "lucide-react";

interface EventDetailsCardProps {
  title: string;
  logo: string;
  place: string;
  date: string;
  hour: string;
  address: string;
}

export default function EventDetailsCard({
  title,
  logo,
  date,
  hour,
  place,
  address,
}: EventDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent className="text-center">
        <Button variant="ghost" className="relative h-20 w-20 rounded-full">
          <Avatar className="h-20 w-20">
            <AvatarImage src={logo} alt="user avatar" className="select-none" />
          </Avatar>
        </Button>
        <div className="mt-6 flex items-center text-sm">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date}
        </div>
        <div className="mt-2 flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {hour}
        </div>
        <div className="mt-2 flex items-center text-sm font-semibold">
          <MapPinIcon className="mr-1 h-4 w-4" />
          {place}
        </div>
        <div className="flex items-center text-sm text-left">
          <MapPinIcon className="invisible mr-1 h-4 w-4" />
          <span className="ml-1">{address}</span>
        </div>
        <Button variant="default" className="mt-6 w-full">
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
}
