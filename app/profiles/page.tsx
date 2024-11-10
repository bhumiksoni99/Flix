import React from "react";
import { redirect, useRouter } from "next/navigation";
import withAuth from "../components/withAuth";
import { useSession } from "next-auth/react";
import ImageText from "./imageText";

function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-12">
      <h2 className="text-4xl font-bold text-white">Who's Watching?</h2>
      <div className="group flex flex-col items-center gap-6">
        <ImageText />
      </div>
    </div>
  );
}

export default withAuth(Page);
