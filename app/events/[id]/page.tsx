"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IEvent {
  id: string;
  title: string;
  logo: string;
  date: string;
  placeName: string;
  address: {
    city: string;
    state: string;
    street: string;
    postalCode: string;
  };
  description: string;
  banner: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const formattedDescription = (description: string) => {
  return description
    .split(/\n/g)
    .map((line, index) =>
      line === "" ? <br key={index} /> : <p key={index}>{line}</p>
    );
};

export default function EventDetail({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    async function getEventById(eventId: string) {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: "GET",
        });

        const event = await response.json();
        setEvent(event);
      } catch (error) {
        console.error("Erro ao buscar o evento:", error);
      }
    }

    getEventById(params.id);
  }, [params.id]);

  if (!event) return <h2>Loading...</h2>;

  const formattedDate = format(event.date, "eeee, dd 'de' MMMM", {
    locale: ptBR,
  }).replace(/^\w/, (c) => c.toUpperCase());
  const formattedHour = format(new Date(event.date), "HH:mm");
  const formattedAddress = `${event.address.street}, ${event.address.postalCode}, ${event.address.city}, ${event.address.state} `;

  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
        <div className="col-span-3 order-2 lg:order-1">
          <div className="relative w-full h-96">
            <Image
              src="https://placehold.co/400x400?text=Event%20Banner"
              alt=""
              className="rounded-lg"
              objectFit="cover"
              fill
            />
          </div>
          <h3 className="mt-8 text-xl font-medium">Descrição do Evento</h3>
          <div className="mt-6 text-[15px] text-muted-foreground">
            {formattedDescription(event.description)}
          </div>
        </div>
        <div className="col-span-1 order-1 lg:order-2 ">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-center">
                {event.title}
              </h2>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="ghost"
                className="relative h-20 w-20 rounded-full"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://placehold.co/400"
                    alt="user avatar"
                    className="select-none"
                  />
                </Avatar>
              </Button>
              <div className="mt-6 flex items-center text-sm">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {formattedDate}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4" />
                {formattedHour}
              </div>
              <div className="mt-2 flex items-center text-sm font-semibold">
                <MapPinIcon className="mr-1 h-4 w-4" />
                {event.placeName}
              </div>
              <div className="flex items-center text-sm text-left">
                <MapPinIcon className="invisible mr-1 h-4 w-4" />
                <span className="ml-1">{formattedAddress}</span>
              </div>
              <Button variant="default" className="mt-6 w-full">
                Comprar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
