"use client";

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

  return <>{JSON.stringify(event)}</>;
}
