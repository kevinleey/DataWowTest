import ConcertCard from "./ConcertCard";
import { useConcerts } from "../_context/ConcertContext";

interface ConcertListProps {
  handleDeleteSuccess: () => void;
}

export default function ConcertList({ handleDeleteSuccess }: ConcertListProps) {
  const { concerts } = useConcerts();

  return (
    <div className="concert-list-container">
      {concerts?.map((concert) => {
        return (
          <ConcertCard
            key={concert.id}
            concert={concert}
            handleDeleteSuccess={handleDeleteSuccess}
          />
        );
      })}
    </div>
  );
}
