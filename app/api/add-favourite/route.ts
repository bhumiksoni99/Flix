import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { movieId } = await req.json();

    const { currentUser } = await serverAuth();

    await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds: {
          push: movieId,
        },
      },
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

export async function DELETE(req: NextRequest) {
  try {
    const { movieId } = await req.json();
    const { currentUser } = await serverAuth();

    const user = await prismadb.user.findUnique({
      where: { id: currentUser.id },
    });
    const filterFavIds = user?.favouriteIds.filter((id) => id !== movieId);
    await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds: filterFavIds,
      },
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
