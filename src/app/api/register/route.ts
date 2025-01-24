import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, password } = await request.json();

  await connectdb();

  const checkUser = await User.findOne({ email: email });

  if (checkUser) {
    if (checkUser.email == email) {
      return NextResponse.json(
        { messsage: "This email already exist" },
        { status: 500 }
      );
    } else if (
      checkUser.first_name + checkUser.last_name ==
      firstName + lastName
    ) {
      return NextResponse.json(
        { messsage: "This name already exist" },
        { status: 500 }
      );
    }
  }

  try {
    const readyData = {
      username:
        String(firstName).toLowerCase() + "_" + String(lastName).toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      last_login: new Date(),
    };

    const user = await User.create(readyData);

    //Create JWT token

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

    console.log({ firstName, lastName, email, password });

    return NextResponse.json(
      { message: "User created", user: user, token: token },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something is wrong" },
      { status: 400 }
    );
  }
}
