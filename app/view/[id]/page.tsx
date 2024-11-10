"use client";
import useOneMovie from "@/hooks/useOneMovie";
import { redirect } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

export default function View({ params }: any) {
  const { data, isLoading } = useOneMovie(params.id);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  const { movie } = data;

  return (
    <>
      <div className="absolute text-white flex flex-row gap-4 p-6 items-center z-10">
        <div className="cursor-pointer" onClick={() => redirect("/")}>
          <IoArrowBack className="text-white text-xs md:text-3xl" />
        </div>
        <div className="flex flex-now text-xs md:text-2xl justify-center">
          <p>Watching Now: </p>
          <p className="font-bold ml-2">{movie.title}</p>
        </div>
      </div>
      <video
        poster={movie.thumbnailUrl}
        autoPlay
        src={movie.videoUrl}
        className="w-full md:object-cover h-screen w-screen"
      ></video>
    </>
  );
}
