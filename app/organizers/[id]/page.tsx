"use client";

import { EventCard } from "@/components/Events/EventCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { FacebookIcon, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IOrganizer {
  id: string;
  name: string;
  logo: string;
  address: {
    city: string;
    state: string;
    street: string;
    postalCode: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

interface IEvent {
  id: number;
  banner: string;
  title: string;
  date: string;
  organization: {
    name: string;
  };
}

export default function OrganizerPage({ params }: { params: { id: string } }) {
  const [organizer, setOrganizer] = useState<IOrganizer | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    async function getOrganizerById(organizerId: string) {
      try {
        const response = await fetch(`/api/organizers/${organizerId}`);
        const organizer = await response.json();
        setOrganizer(organizer);
      } catch (error) {
        console.error("Erro ao buscar o organizador:", error);
      }
    }

    async function getEventsByOrganizerId(organizerId: string) {
      try {
        const response = await fetch(`/api/organizers/${organizerId}/events`);
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    getOrganizerById(params.id);
    getEventsByOrganizerId(params.id);
  }, [params.id]);

  return (
    <div className="container px-4 py-10 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-28 w-28 mr-4 border border-gray-300 p-0.5">
            <AvatarImage
              src={organizer?.logo || "https://placehold.co/200x200?text=Logo"}
              alt="event logo"
              className="select-none object-cover rounded-full"
            />
          </Avatar>
          <h1 className="text-2xl font-bold">{organizer?.name}</h1>
        </div>
        <div className="flex gap-1 items-center">
          {organizer?.socialLinks.facebook && (
            <Link
              href={organizer.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="p-2 rounded-full"
            >
              <FacebookIcon className="h-5 w-5" />
            </Link>
          )}
          {organizer?.socialLinks.instagram && (
            <a
              href={organizer.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="p-2 rounded-full"
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {organizer?.socialLinks.twitter && (
            <Link
              href={organizer.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              className="p-2 rounded-full"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          )}
          {organizer?.socialLinks.linkedin && (
            <Link
              href={organizer.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="p-2 rounded-full"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
      {events.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Eventos</h2>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 mx-auto"
          >
            {events.map(({ id, banner, title, date, organization }) => (
              <EventCard
                key={id}
                id={id}
                banner={banner}
                title={title}
                date={formatDate(date)}
                place={organization.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Eventos</h2>
          <p className="text-gray-500">Nenhum evento encontrado.</p>
        </div>
      )}
    </div>
  );
}
