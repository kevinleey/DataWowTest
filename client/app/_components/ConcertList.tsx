import ConcertCard from "./ConcertCard";
import { useConcerts } from "../_context/ConcertContext";
import { useReservations } from "../_context/ReservationContext";

interface ConcertListProps {
  handleDeleteSuccess: () => void;
  curUser: any;
}

export default function ConcertList({
  handleDeleteSuccess,
  curUser,
}: ConcertListProps) {
  const { concerts } = useConcerts();
  const { reservations } = useReservations();

  const userReservations = reservations.filter(
    (reservation) => reservation.username === curUser.username,
  );

  return (
    <div className="concert-list-container">
      {concerts?.map((concert) => {
        const userReservation = userReservations.find(
          (reservation) => reservation.concertId === concert.id,
        );

        return (
          <ConcertCard
            key={concert.id}
            concert={concert}
            handleDeleteSuccess={handleDeleteSuccess}
            curUser={curUser}
            reservationId={userReservation?.id}
          />
        );
      })}
    </div>
  );
}
