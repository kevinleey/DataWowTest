interface ReservationButtonProps {
  onClick: () => void;
}

export default function ReservationButton({ onClick }: ReservationButtonProps) {
  return (
    <button className="button reserve-button" onClick={onClick}>
      Reserve
    </button>
  );
}
