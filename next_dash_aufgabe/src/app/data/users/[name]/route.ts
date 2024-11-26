import { NextResponse } from "next/server";
import { users } from "../route";

export async function GET(
    _request: Request, 
    { params }: { params: { name: string } }
) {
    const { name } = await params;
    const user = users.find((user) => user.name === name);
    return Response.json(user);
}

export async function POST(request: Request, { params }: { params: { name: string } }) {
    const { name, pw } = await request.json();
    const user = users.find((user) => user.name === name);
    if (user != undefined) {
        if (user.pw == pw) {
            const id = user.id;
            const firstname = user.firstname;
            const lastname = user.lastname;
            const token = JSON.stringify({ id, name, firstname, lastname });
            if (!token) {
                return NextResponse.json({ message: "Failed to retrieve token" }, { status: 500 });
            }

            const response = NextResponse.json({ message: "Login successful", username: name });
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "strict",
                maxAge: 60 * 60, // 1 hour expiration
            });

            return response;       
        }
    }
    return NextResponse.json({ message: "AAA" + user, username: name });
}