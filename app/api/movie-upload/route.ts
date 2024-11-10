import { Movie } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { movies } = await req.json();
    movies.map(async (movie: Movie) => {
      try {
        await prismadb.movie.create({
          data: movie,
        });
      } catch (e) {
        console.log("sa", e);
      }
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ message: "sdhohb" }, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
