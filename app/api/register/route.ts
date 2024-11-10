import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

// export default async function handler(request: Nex, response: NextApiResponse) {
//   console.log("jereeee");
//   try {
//     const { email, username, password } = request.body;
//     response.status(422).json({ message: "Email Already exists" });

//     const existing = await prismadb.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existing) {
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = await prismadb.user.create({
//       data: {
//         email,
//         hashedPassword,
//         name: username,
//       },
//     });

//     response.status(200).json({ user, message: "Registered! Head to login!" });
//   } catch (e) {
//     console.log("error", e);
//     response.status(400).end();
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();
    // return NextResponse.json({ error: "asn" }, { status: 405 });

    const existing = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email Already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name: username,
      },
    });

    return NextResponse.json(
      {
        user,
        message: "Registered! Head to login!",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("error", e);
    NextResponse.json({ error: "Something went wrong" }, { status: 400 });
  }
}
