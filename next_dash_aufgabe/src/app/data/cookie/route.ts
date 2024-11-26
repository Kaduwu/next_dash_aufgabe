import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
    const token = request.cookies.get('token')?.value;
    const response = NextResponse.json({ token });
    return response;
}