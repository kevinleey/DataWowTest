"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  role: string;
  username: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  switchRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    role: "admin",
    username: "admin",
  });

  const switchRole = () => {
    setUser((prevUser) => ({
      ...prevUser,
      role: prevUser.role === "admin" ? "user" : "admin",
      username: prevUser.role === "admin" ? "Sarah John" : "admin",
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, switchRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
