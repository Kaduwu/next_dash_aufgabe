"use client";
import { useLogin } from "@/app/components/loginContext"
import getMockUser from "@/app/data/user";
import { redirect } from "next/navigation";
import { CurrentUserContext } from "@/app/components/loginContext";
import { useContext } from "react";

export default function Dashboard() {
    const currentUser = useContext(CurrentUserContext)?.currentUser;

    const name = currentUser?.firstname + " " + currentUser?.lastname;

    if (!currentUser) {
        redirect("./login/");  
    } else {
        return (
            <>
            <div>
                Herzlich Willkommen, {name}.
            </div>
            </>
        );
    }
}