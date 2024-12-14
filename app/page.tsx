import { EventCard } from "@/components/event-card";

export default async function Home() {
  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem]
        lg:max-w-[64rem] xl:max-w-[80rem]"
    >
      {[...Array(10)].map((_, i) => (
        <EventCard
          key={i}
          id={i}
          image="https://placehold.co/400x600?text=Event%20Image"
          title="Event Title"
          date="14/12/2024"
          place="Place Name"
        />
      ))}
    </div>
  );
}
