import StatisticCard from "./StatisticCard";
import { UserIcon } from "../constants";
import { ReservationIcon } from "../constants";
import { CancelIcon } from "../constants";

export default function Statistics() {
  return (
    <div className="statistics-container">
      <StatisticCard icon={UserIcon} text={"Total of seats"} statistic={500} />
      <StatisticCard
        icon={ReservationIcon}
        text={"Reservations"}
        statistic={120}
      />
      <StatisticCard icon={CancelIcon} text={"Cancellations"} statistic={12} />
    </div>
  );
}
