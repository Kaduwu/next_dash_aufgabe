"use client";
import React, { createContext, useContext, useState } from "react";
import { User } from "../data/user";

export const CurrentUserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  } | null>(null);

export function LoginProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadCookieData() {
      const res = await fetch("../data/cookie", {
        method: "GET",
      });

      const result = await res.json();

      if (result.token) {
        const user : User = JSON.parse(result.token)
        setCurrentUser(user);
        console.log("Current User: " + currentUser);
      } 
      console.log(currentUser)
      setLoading(false);
    }

    if (loading) {
      console.log("AAAA")
      loadCookieData();
    }

    return (
      <>
      {loading ? 
          (<></>) : 
          (<CurrentUserContext.Provider value={{currentUser,setCurrentUser}}>{children}</CurrentUserContext.Provider>)}
      </>     
    )
}
