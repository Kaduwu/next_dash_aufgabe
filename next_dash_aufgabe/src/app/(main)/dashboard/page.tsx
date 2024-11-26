"use client";
import { CurrentUserContext } from "@/app/components/loginContext";
import { useContext } from "react";

export default function Dashboard() {
    const currentUser = useContext(CurrentUserContext)?.currentUser;

    return (
        <>
            <div className="text-7xl m-16">
                {currentUser ? (<div>Herzlich Willkommen, {currentUser?.firstname} {currentUser?.lastname}.</div>) : (<></>)}
            </div>
        </>
    );
}