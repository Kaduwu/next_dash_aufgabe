"use client";
import { redirect } from "next/navigation";
import { useLogin, useLoginUpdate } from "./loginContext"
import Link from "next/link";
import { CurrentUserContext } from "./loginContext";
import { useContext } from "react";

export function LoginButton() {
    const login = useLogin()
    const toggleLogin = useLoginUpdate()
    const currentUser = useContext(CurrentUserContext)?.currentUser;
    const { setCurrentUser } = useContext(CurrentUserContext)!;

    function logOut() {
        setCurrentUser(null);
    }

    return (
        <>
        {currentUser ? (
            <button onClick={logOut}>Logout</button>
        ) : (
            <Link href={"/login/"}>Login</Link>
        )}
        </>
    )
}