import ConcertCard from "./ConcertCard";
import { useConcerts } from "../_context/ConcertContext";

interface ConcertListProps {
  handleDeleteSuccess: () => void;
  curUser: any;
}

export default function ConcertList({
  handleDeleteSuccess,
  curUser,
}: ConcertListProps) {
  const { concerts } = useConcerts();

  return (
    <div className="concert-list-container">
      {concerts?.map((concert) => {
        return (
          <ConcertCard
            key={concert.id}
            concert={concert}
            handleDeleteSuccess={handleDeleteSuccess}
            curUser={curUser}
          />
        );
      })}
    </div>
  );
}
