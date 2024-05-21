import { useConcerts } from "../../_context/ConcertContext";
import { useState } from "react";
import { useReservations } from "../../_context/ReservationContext";
import { useReservationHistory } from "../../_context/ReservationHistoryContext";
import { useUser } from "../../_context/UserContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ReservationButton from "./ReservationButton";
import CancelReservationButton from "./CancelReservationButton";
import { Concert } from "../../_interfaces/Concert";
import { User } from "../../_interfaces/User";
import { DeleteIcon, UserIcon } from "../../_assets/constants";

interface ConcertCardProps {
  concert: Concert;
  handleDeleteSuccess: () => void;
  curUser: User;
  reservationId?: number;
}

export default function ConcertCard({
  concert,
  handleDeleteSuccess,
  curUser,
  reservationId,
}: ConcertCardProps) {
  const { deleteConcert } = useConcerts();
  const { createReservation, deleteReservation } = useReservations();
  const { createHistory } = useReservationHistory();
  const { user } = useUser();
  const { id, name, description, reservations } = concert || {};
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteConcert(id);
    handleDeleteSuccess();
  };

  const handleCancelReservation = () => {
    if (reservationId) {
      deleteReservation(reservationId);
      createHistory(user.username, concert.name, "Cancel");
    }
  };

  const handleReserveConcert = () => {
    createReservation(curUser.username, id);
    createHistory(user.username, concert.name, "Reserve");
  };

  return (
    <div className="card-container">
      <h2 className="card-title">{name}</h2>
      <div className="separator"></div>
      <h5 className="concert-card-description">{description}</h5>
      <div className="concert-card-footer-container">
        <div className="concert-card-reservations-container">
          {UserIcon}
          <span className="small-icon-margin">
            {reservations.toLocaleString()}
          </span>
        </div>
        {curUser?.role === "admin" ? (
          <button
            className="button concert-card-delete-button"
            onClick={() => setOpen(true)}
          >
            {DeleteIcon}
            <span className="small-icon-margin">Delete</span>
          </button>
        ) : reservationId ? (
          <CancelReservationButton onClick={handleCancelReservation} />
        ) : (
          <ReservationButton onClick={handleReserveConcert} />
        )}
      </div>
      <DeleteConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        concertName={name}
      />
    </div>
  );
}
