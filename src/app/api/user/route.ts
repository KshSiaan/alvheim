import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import { createSecretKey } from "crypto";
import connectdb from "@/lib/db";
import User from "@/model/userModel";

// TODO: In production, use an environment variable for the secret key
const SECRET_KEY = "raven";

interface AuthPayload extends JWTPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  try {
    await connectdb();

    const token = extractToken(request);
    if (!token) {
      return createErrorResponse("Authorization token missing", 401);
    }

    const payload = await verifyToken(token);
    const user = await fetchUser(payload.id);

    if (!user) {
      return createErrorResponse("User not found", 404);
    }

    return NextResponse.json(
      { message: "Authentication successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    return createErrorResponse("Authentication failed", 401);
  }
}

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

async function verifyToken(token: string): Promise<AuthPayload> {
  const secretKey = createSecretKey(Buffer.from(SECRET_KEY, "utf-8"));
  const { payload } = await jwtVerify(token, secretKey);
  return payload as AuthPayload;
}

async function fetchUser(userId: string) {
  return await User.findById(userId);
}

function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}
