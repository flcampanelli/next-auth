import { EventCard } from "@/components/EventCard";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { formatDate } from "@/lib/utils";

interface IEvent {
  id: number;
  banner: string;
  title: string;
  date: string;
  placeName: string;
}

async function getAllEvents(): Promise<IEvent[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/events`, {
    method: "GET",
    cache: "no-store",
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
      {events.length ? (
        events.map(({ id, banner, title, date, placeName }) => (
          <EventCard
            key={id}
            id={id}
            banner={banner}
            title={title}
            date={formatDate(date)}
            place={placeName}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">
            Nenhum evento encontrado
          </h2>
          <p className="text-gray-500">
            Não há eventos registrados no momento.
          </p>
        </div>
      )}
    </div>
  );
}
