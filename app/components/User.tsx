"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { signOut } from "next-auth/react";

export default function User() {
  const { data, isLoading, error } = useCurrentUser();

  return (
    <>
      {isLoading && <p className="text-white">Loading...</p>}
      {(error || data) && (
        <button
          className="h-10 bg-white"
          onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
        >
          Sign out
        </button>
      )}
    </>
  );
}
