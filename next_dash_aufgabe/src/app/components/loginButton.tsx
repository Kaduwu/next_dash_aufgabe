"use client";
import Link from "next/link";
import { CurrentUserContext } from "./loginContext";
import { useContext, useState } from "react";

const style = "text-center p-2 text-2xl px-4 transition hover:bg-sky-500"

export function LoginButton() {
    const currentUser = useContext(CurrentUserContext)?.currentUser;

    return (
        <>
            {currentUser ? 
                (<LogoutButton />) : 
                (<Link href={"/login/"} className={style}>Login</Link>)}
        </>
    )
}

function LogoutButton() {
    const { setCurrentUser } = useContext(CurrentUserContext)!;
    async function logout() {
        const res = await fetch("../data/logout", {
            method: "GET",
          });
        setCurrentUser(null);
    }
    return (
        <Link href={"/login/"} className={style}>
            <button onClick={logout}>Logout</button>
        </Link>
    )
}