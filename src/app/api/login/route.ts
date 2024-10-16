import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    return NextResponse.json({
      data: [],
      message: "User login successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
