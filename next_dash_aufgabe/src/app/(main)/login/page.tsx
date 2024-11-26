"use client";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { CurrentUserContext } from "@/app/components/loginContext";
import { User } from "@/app/data/user";
import { styleInput, styleButton } from "@/app/styles/styles";

export default function Login() {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const { setCurrentUser } = useContext(CurrentUserContext)!;
    const currentUser = useContext(CurrentUserContext)?.currentUser;

    const handleSubmit = async () => {
        try {
            const res = await fetch("../data/users/" + name, {
                method: "GET",
              });
            const result = await res.json();
            if (res.ok) {
                if (result.pw == pw) {
                    const res = await fetch("../data/login/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, pw }),
                    });
                    const user : User = {
                        id: 0,
                        name: name,
                        firstname: result.firstname,
                        lastname: result.lastname
                    }
                    setCurrentUser(user);
                } else {
                    setError("Wrong username or password.");
                }
            } else {
                setError(result.message || "Login failed.");
            }
        } catch {
            setError("Wrong username or password.");
        }
      };
      
    if (currentUser) {
        redirect("./dashboard/");  
    } else {
        return (
            <div className="flex flex-col max-w-md">
                <div className="text-lg mt-4 ml-4">Login</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            className={styleInput}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={pw}
                            className={styleInput}
                            onChange={(e) => setPw(e.target.value)}
                        /><br/>
                        <button type="button" onClick={handleSubmit} className={styleButton}>Login</button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
            </div>
        )
    }
}