import { useConcerts } from "../_context/ConcertContext";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { styled } from "@mui/system";
import { Backdrop } from "@mui/material";
import { useReservations } from "../_context/ReservationContext";
import { useReservationHistory } from "../_context/ReservationHistoryContext";
import { useUser } from "../_context/UserContext";

interface ConcertCardProps {
  concert: any;
  handleDeleteSuccess: () => void;
  curUser: any;
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            height="20"
            width="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span className="small-icon-margin">
            {reservations.toLocaleString()}
          </span>
        </div>
        {curUser?.role === "admin" ? (
          <button
            className="button concert-card-delete-button"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              height="20"
              width="20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span className="small-icon-margin">Delete</span>
          </button>
        ) : reservationId ? (
          <button
            className="button concert-card-delete-button"
            onClick={handleCancelReservation}
          >
            Cancel
          </button>
        ) : (
          <button
            className="button reserve-button"
            onClick={handleReserveConcert}
          >
            Reserve
          </button>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <div className="modal-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#E84E4E"
            height="60px"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
          <h3 className="modal-title">
            Are you sure you want to delete?
            <br />"{name}"
          </h3>
          <div className="modal-footer">
            <button
              onClick={handleClose}
              className="button modal-button cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="button modal-button concert-card-delete-button"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const StyledBackdrop = styled(Backdrop)`
  z-index: 1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
