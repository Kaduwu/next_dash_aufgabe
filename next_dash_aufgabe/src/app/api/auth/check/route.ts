import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies utility from next/headers
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies(); // Ensure we await the Promise to get the cookies

  const token = cookieStore.get("token")?.value; // Get the 'token' cookie value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 }); // User not logged in
  }

  try {
    // Verify the JWT token and decode it
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // If the token is valid, extract the username
    const user = {
      username: decoded.sub, // 'sub' contains the username (or other relevant user info)
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json({ user: null }, { status: 401 }); // Invalid token
  }
}
