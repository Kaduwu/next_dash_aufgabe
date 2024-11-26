"use client";
import Link from "next/link";
import { CurrentUserContext } from "./loginContext";
import { useContext } from "react";
import { styleNav } from "../styles/styles";

const style = styleNav

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