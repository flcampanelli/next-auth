import { EventCard } from "@/components/event-card";

interface IEvent {
  id: number;
  banner: string;
  title: string;
  date: string;
  placeName: string;
}

async function getAllEvents(): Promise<IEvent[]> {
  const response = await fetch("http://localhost:3000/api/events", {
    method: "GET",
  });

  const events = await response.json();
  return events;
}

export default async function Home() {
  const events = await getAllEvents();

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem]
        lg:max-w-[64rem] xl:max-w-[80rem]"
    >
      {events.map(({ id, banner, title, date, placeName }) => (
        <EventCard
          key={id}
          id={id}
          image={"https://placehold.co/400x600?text=Event%20Image"}
          title={title}
          date={date}
          place={placeName}
        />
      ))}
    </div>
  );
}
