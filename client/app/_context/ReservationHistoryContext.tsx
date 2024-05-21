"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ReservationHistory {
  id: number;
  concertName: string;
  username: string;
  action: string;
  timestamp: Date;
}
import { ReservationHistory } from "../_interfaces/ReservationHistory";

interface ReservationHistoryContextType {
  reservationHistory: ReservationHistory[];
  setReservationHistory: React.Dispatch<
    React.SetStateAction<ReservationHistory[]>
  >;
  createHistory: (
    username: string,
    concertName: string,
    action: string,
  ) => Promise<void>;
  deleteHistory: (id: number) => Promise<void>;
}

const ReservationHistoryContext = createContext<
  ReservationHistoryContextType | undefined
>(undefined);

export const ReservationHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [reservationHistory, setReservationHistory] = useState<
    ReservationHistory[]
  >([]);

  const createHistory = async (
    username: string,
    concertName: string,
    action: string,
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3001/reservationHistories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, concertName, action }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ReservationHistory = await response.json();

      setReservationHistory((prevReservationHistory) => [
        ...prevReservationHistory,
        data,
      ]);
    } catch (error) {
      console.error("There was a problem with the create operation:", error);
      throw error;
    }
  };

  const deleteHistory = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setReservationHistory((prevReservationHistory) =>
        prevReservationHistory.filter((reservation) => reservation.id !== id),
      );
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  useEffect(() => {
    const fetchReservationHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/reservationHistories",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReservationHistory(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchReservationHistory();
  }, []);

  return (
    <ReservationHistoryContext.Provider
      value={{
        reservationHistory,
        setReservationHistory,
        createHistory,
        deleteHistory,
      }}
    >
      {children}
    </ReservationHistoryContext.Provider>
  );
};

export const useReservationHistory = () => {
  const context = useContext(ReservationHistoryContext);
  if (!context) {
    throw new Error(
      "useReservationHistory must be used within a ReservationHistoryProvider",
    );
  }
  return context;
};
