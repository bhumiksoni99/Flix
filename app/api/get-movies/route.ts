import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET() {
  try {
    const movies = await prismadb.movie.findMany();
    return NextResponse.json({ movies }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong", error: JSON.stringify(e) },
      { status: 405 }
    );
  }
}
