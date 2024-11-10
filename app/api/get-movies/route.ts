import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const movies = await prismadb.movie.findMany();
    console.log("as", movies);
    return NextResponse.json({ movies }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
