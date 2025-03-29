"use client";

import EventDetailsCard from "@/components/event-details-card";
import EventSkeleton from "@/components/event-skeleton";
import { formatDate, formatHour } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

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
  return (
    description &&
    description
      .split(/\n/g)
      .map((line, index) =>
        line === "" ? <br key={index} /> : <p key={index}>{line}</p>
      )
  );
};

export default function EventDetail({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const isNewEvent = sessionStorage.getItem("newEventCreated") === "true";
    if (isNewEvent) {
      setShowConfetti(true);
      sessionStorage.removeItem("newEventCreated");
    }
  }, []);

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

  if (!event) return <EventSkeleton />;

  const formattedDate = formatDate(event.date);
  const formattedHour = formatHour(event.date);
  const formattedAddress = `${event.address.street}, ${event.address.postalCode}, ${event.address.city}, ${event.address.state} `;

  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          tweenDuration={2000}
          initialVelocityY={-10}
          gravity={0.3}
          style={{ zIndex: 50, position: "fixed" }}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
        <div className="col-span-3 order-2 lg:order-1">
          <div className="relative w-full h-96">
            <Image
              src={
                event.banner ||
                "https://placehold.co/400x400?text=Event%20Banner"
              }
              alt={`${event.title} banner`}
              className="rounded-lg"
              objectFit="cover"
              fill
              priority
            />
          </div>
          {event.description && (
            <>
              <h3 className="mt-8 text-xl font-medium">Descrição do Evento</h3>
              <div className="mt-6 text-[15px] text-muted-foreground">
                {formattedDescription(event.description)}
              </div>
            </>
          )}
        </div>
        <div className="col-span-1 order-1 lg:order-2">
          <EventDetailsCard
            title={event.title}
            logo={event.logo}
            place={event.placeName}
            date={formattedDate}
            hour={formattedHour}
            address={formattedAddress}
          />
        </div>
      </div>
    </div>
  );
}
