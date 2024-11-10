import { getServerSession } from "next-auth";

import prismadb from "./prismadb";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const serverAuth = async (req: NextRequest) => {
  console.log("as", req);
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
