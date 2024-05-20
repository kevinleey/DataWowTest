"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Reservation {
  id: number;
  concertId: number;
  username: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  createReservation: (username: string, concertId: number) => Promise<void>;
  deleteReservation: (id: number) => Promise<void>;
  getReservationsByUsername: (username: string) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:3001/reservations");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const getReservationsByUsername = async (username: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/reservations/user/${username}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const createReservation = async (username: string, concertId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, concertId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Reservation = await response.json();

      const newReservation = {
        id: data.id,
        concertId,
        username,
      };

      setReservations((prevReservations) => [
        ...prevReservations,
        newReservation,
      ]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const deleteReservation = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id),
      );
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
        createReservation,
        deleteReservation,
        getReservationsByUsername,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservations must be used within a ReservationProvider",
    );
  }
  return context;
};
