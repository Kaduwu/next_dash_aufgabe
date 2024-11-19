"use client";
import React, { createContext, useContext, useState } from "react";
import { MockUser } from "../data/user";

function defaultFunc() {
    console.log("Hell Wrld");
}

const LoginContext = createContext(false);
const LoginUpdateContext = createContext(defaultFunc);
export const CurrentUserContext = createContext<{
    currentUser: MockUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<MockUser | null>>;
  } | null>(null);

export function useLogin() {
    return useContext(LoginContext);
}

export function useLoginUpdate() {
    return useContext(LoginUpdateContext);
}

export function LoginProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [login, setLogin] = useState(false)
    const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

    function loginUpdate() {
        setLogin(prevUser => !prevUser);
    }

    return (
        <LoginContext.Provider value={login}>
            <LoginUpdateContext.Provider value={() => loginUpdate}>
                <CurrentUserContext.Provider value={{currentUser,setCurrentUser}}>
                {children}
                </CurrentUserContext.Provider>
            </LoginUpdateContext.Provider>
        </LoginContext.Provider>
    )
}
