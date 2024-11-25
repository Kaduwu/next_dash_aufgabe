"use client";
import { useLogin, useLoginUpdate } from "@/app/components/loginContext";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { loginCheck } from "@/app/data/login";
import { CurrentUserContext } from "@/app/components/loginContext";
import { MockUser } from "@/app/data/user";

export default function Login() {
    const stlye = "m-4 border border-2";
    const login = useLogin();
    const toggleLogin = useLoginUpdate();
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [text, setText] = useState("");
    const { setCurrentUser } = useContext(CurrentUserContext)!;
    const currentUser = useContext(CurrentUserContext)?.currentUser;

    function loginFunction() {
        const user = loginCheck(name, pw)
        if (user) {
            setCurrentUser(user);
        } else {
            setText("Wrong username or password.");
        }
    }

    if (currentUser) {
        redirect("./dashboard/");  
    } else {
        return (
            <div className="flex flex-col max-w-md">
                <div className="text-lg mt-4 ml-4">Login</div>
                <input 
                    type="text" 
                    name="user" 
                    className={stlye} 
                    value={name} 
                    onChange={e => setName(e.target.value)}>
                </input>
                <input 
                    type="password" 
                    name="pw" 
                    className={stlye} 
                    value={pw} 
                    onChange={e => setPw(e.target.value)}>
                </input>
                <button onClick={loginFunction} className="ml-8 rounded-md max-w-32 transition p-2 bg-sky-400 hover:bg-sky-500">Submit</button>
                <div>{text}</div>
            </div>
        )
    }
}