import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("movieId");
    if (!id) {
      return NextResponse.json({ message: "Id not found" }, { status: 400 });
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 422 });
    }
    return NextResponse.json({ movie }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
