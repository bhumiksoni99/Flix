import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function withAuth(WrappedComponent: any) {
  return async function AuthenticatedComponent(props: any) {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth");
      return <div></div>;
    }

    return <WrappedComponent {...props} />;
  };
}
