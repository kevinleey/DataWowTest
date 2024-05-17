import ConcertCard from "./ConcertCard";
import { useConcerts } from "../_context/ConcertContext";

interface Concert {
  id: number;
  name: string;
  description: string;
  reservations: number;
}

export default function ConcertList() {
  const { concerts } = useConcerts();

  return (
    <div className="concert-list-container">
      {concerts?.map((concert) => {
        return <ConcertCard key={concert.id} concert={concert} />;
      })}
    </div>
  );
}
