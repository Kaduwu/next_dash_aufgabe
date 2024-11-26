import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire the token
    return response;
}