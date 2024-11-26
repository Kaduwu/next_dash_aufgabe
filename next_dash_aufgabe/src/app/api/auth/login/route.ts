// /app/api/auth/login/route.ts

import { pbkdf2 } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uid, password } = await request.json();

    // Step 1: Fetch the salt from the server and hash the password
    const salt = await getSaltFromPayaraServer(uid);
    if (!salt) {
      return NextResponse.json({ message: "Failed to retrieve salt" }, { status: 500 });
    }

    const hashedPassword = await new Promise<Buffer>((resolve, reject) => {
      pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
        if (err) {
          console.error("Error hashing password:", err);
          return reject(err);
        }
        resolve(derivedKey);
      });
    });

    const hashedPasswordHex = hashedPassword.toString("hex").toUpperCase();

    // Step 2: Send the hashed password to the Payara server for authentication
    const loginRes = await fetch("http://10.137.0.16:8080/authsvc/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, password: hashedPasswordHex }),
    });

    const responseData = await loginRes.json();
    if (!loginRes.ok) {
      console.error("Authentication error:", responseData);
      return NextResponse.json(
        { message: responseData.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = responseData.data;
    if (!token) {
      return NextResponse.json({ message: "Failed to retrieve token" }, { status: 500 });
    }

    // Step 3: Set the JWT as an HTTP-only cookie and return the username in the JSON response
    const response = NextResponse.json({ message: "Login successful", username: uid });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour expiration
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 });
  }
}

// Helper function to get the salt from the Payara server
async function getSaltFromPayaraServer(uid: string): Promise<string | null> {
  try {
    const response = await fetch(`http://10.137.0.16:8080/authsvc/v1/login/salt/${uid}`);
    if (!response.ok) throw new Error("Failed to fetch salt");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching salt:", error);
    return null;
  }
}
