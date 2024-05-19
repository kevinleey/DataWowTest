"use client";

import { useReservationHistory } from "../_context/ReservationHistoryContext";

function formatTimestamp(timestamp: Date): string {
  const pad = (number: number): string => {
    if (number < 10) {
      return "0" + number;
    }
    return number.toString();
  };

  return `${pad(timestamp.getMonth() + 1)}/${pad(timestamp.getDate())}/${timestamp.getFullYear()} ${pad(timestamp.getHours())}:${pad(timestamp.getMinutes())}:${pad(timestamp.getSeconds())}`;
}

export default function HistoryTable() {
  const { reservationHistory } = useReservationHistory();
  const reversedHistory = reservationHistory?.slice().reverse();

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Date time</th>
            <th>Username</th>
            <th>Concert name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reversedHistory?.map((record, index) => (
            <tr key={index}>
              <td>{formatTimestamp(new Date(record.timestamp))}</td>
              <td>{record.username}</td>
              <td>{record.concertName}</td>
              <td>{record.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
