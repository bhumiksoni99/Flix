import React, { ComponentType } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return async function AuthenticatedComponent(props: P) {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth");
      return <div></div>;
    }

    return <WrappedComponent {...props} />;
  };
}
