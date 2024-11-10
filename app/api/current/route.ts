import { NextApiRequest } from "next";

import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
