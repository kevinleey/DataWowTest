import StatisticCard from "./StatisticCard";
import { UserIcon } from "../_assets/constants";
import { ReservationIcon } from "../_assets/constants";
import { CancelIcon } from "../_assets/constants";
import { useConcerts } from "../_context/ConcertContext";
import { useReservationHistory } from "../_context/ReservationHistoryContext";

export default function Statistics() {
  const { concerts } = useConcerts();
  const { reservationHistory } = useReservationHistory();

  const totalSeats = concerts.reduce(
    (total, concert) => total + concert.reservations,
    0,
  );

  let totalReservations = 0;
  let totalCancellations = 0;

  reservationHistory.forEach((history) => {
    if (history.action === "Reserve") {
      totalReservations++;
    } else if (history.action === "Cancel") {
      totalCancellations++;
    }
  });

  return (
    <div className="statistics-container">
      <StatisticCard
        icon={UserIcon}
        text={"Total of seats"}
        statistic={totalSeats}
      />
      <StatisticCard
        icon={ReservationIcon}
        text={"Reservations"}
        statistic={totalReservations}
      />
      <StatisticCard
        icon={CancelIcon}
        text={"Cancellations"}
        statistic={totalCancellations}
      />
    </div>
  );
}
