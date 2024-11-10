"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ImageText() {
  const router = useRouter();
  const { data, error, isLoading } = useCurrentUser();
  if (error) {
    toast.error("Oops something went wrong");
  }
  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <>
      <Toaster />
      <img
        src="/images/default-green.png"
        className="h-36 w-36 rounded-md transform duration-200 hover:scale-110 scale-10 group-hover:border-white border-4 border-transparent group-hover:cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <h5 className="text-gray-400 font-bold text-2xl -mt-2 group-hover:text-white">
        {data?.name}
      </h5>
    </>
  );
}
