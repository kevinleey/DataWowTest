interface CancelReservationButtonProps {
  onClick: () => void;
}

export default function CancelReservationButton({
  onClick,
}: CancelReservationButtonProps) {
  return (
    <button className="button concert-card-delete-button" onClick={onClick}>
      Cancel
    </button>
  );
}
