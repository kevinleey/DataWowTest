import ConcertCard from "./ConcertCard";

interface Concert {
  id: number;
  name: string;
  description: string;
  reservations: number;
}

export default function ConcertList({ concerts }: { concerts: Concert[] }) {
  return (
    <div className="concert-list-container">
      {concerts?.map((concert) => {
        return <ConcertCard key={concert.id} concert={concert} />;
      })}
    </div>
  );
}
