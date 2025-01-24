import { type NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";
import bcrypt from "bcryptjs";
import connectdb from "@/lib/db";
import User from "@/model/userModel";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    await connectdb();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Create JWT token
    const secretKey = createSecretKey("raven", "utf-8");

    const JWTData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await new SignJWT(JWTData)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1 day")
      .sign(secretKey);

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
