// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get("redirectUrl") || "/"; // Default to homepage if no redirect URL is provided

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire the token

  // Redirect back to the current page or home page
  response.headers.set("Location", redirectUrl);

  return response;
}
