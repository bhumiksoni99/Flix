import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
