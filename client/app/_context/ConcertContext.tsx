"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Concert {
  id: number;
  name: string;
  description: string;
  reservations: number;
}

interface ConcertContextType {
  concerts: Concert[];
  setConcerts: React.Dispatch<React.SetStateAction<Concert[]>>;
  deleteConcert: (id: number) => void;
}

const ConcertContext = createContext<ConcertContextType | undefined>(undefined);

export const ConcertProvider = ({ children }: { children: ReactNode }) => {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  const getConcerts = async () => {
    try {
      const response = await fetch("http://localhost:3001/concerts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setConcerts(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const deleteConcert = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/concerts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setConcerts((prevConcerts) =>
        prevConcerts.filter((concert) => concert.id !== id),
      );
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  useEffect(() => {
    getConcerts();
  }, []);

  return (
    <ConcertContext.Provider value={{ concerts, setConcerts, deleteConcert }}>
      {children}
    </ConcertContext.Provider>
  );
};

export const useConcerts = () => {
  const context = useContext(ConcertContext);
  if (!context) {
    throw new Error("useConcerts must be used within a ConcertProvider");
  }
  return context;
};
