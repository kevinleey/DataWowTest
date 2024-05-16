import { ReactNode } from "react";

interface StatisticCardProps {
  icon: ReactNode;
  text: string;
  statistic: number;
}

export default function StatisticCard({
  icon,
  text,
  statistic,
}: StatisticCardProps) {
  return (
    <div className="stat-card-container">
      <span className="stat-icon">{icon}</span>
      <span className="stat-text">{text}</span>
      <span className="stat-number">{statistic}</span>
    </div>
  );
}
