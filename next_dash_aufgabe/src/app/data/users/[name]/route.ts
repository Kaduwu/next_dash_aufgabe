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