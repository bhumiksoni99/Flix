import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const user = await prismadb.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    const movies = await prismadb.movie.findMany({
      where: {
        id: { in: user?.favouriteIds },
      },
    });
    return NextResponse.json({ movies }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
