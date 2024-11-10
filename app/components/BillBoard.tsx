"use client";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import useMovies from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import InfoModal from "./InfoModal";

const BillBoard: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { data, isLoading } = useMovies();
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen text-white items-center justify-center">
        Loading...
      </div>
    );
  }
  const randomIdx = Math.floor(Math.random() * 4);

  const movie = data.movies[randomIdx];
  return (
    <>
      <div className="relative h-screen">
        <video
          poster={movie.thumbnailUrl}
          autoPlay
          muted
          loop
          src={movie.videoUrl}
          className="w-full object-cover z-0 brightness-[60%] max-h-[80vw] min-h-[80vw] md:max-h-[50vw] md:min-h-[50vw] lg:max-h-[90%] lg:min-h-[90%]"
        ></video>
        <div className="absolute top-[20%] lg:top-[30%] left-10 z-100 overflow-none pb-60">
          <p className="text-white text-lg lg:text-4xl font-bold drop-shadow-xl">
            {movie.title}
          </p>
          <p className="text-white mt-4 text-xs lg:text-lg max-w-[50%] drop-shadow-xl hidden md:block">
            {movie.description}
          </p>
          <div className="flex flex-row mt-6 gap-4">
            <button
              className="bg-white lg:min-w-24 py-2 px-4 text-xs lg:text-lg font-semibold flex items-center gap-2 justify-center rounded-md"
              onClick={() => router.push(`/view/${movie.id}`)}
            >
              <FaPlay className="text-xs" />
              <p>Play</p>
            </button>
            <button
              onClick={() => setVisible(true)}
              className="bg-gray-400 bg-opacity-60 min-w-24 px-4 text-xs lg:text-lg py-2 font-semibold flex items-center gap-2 justify-center rounded-md cursor-pointer"
            >
              <CiCircleInfo className="text-white" />
              <p className="text-white">More info</p>
            </button>
          </div>
        </div>
      </div>
      <InfoModal
        visible={visible}
        movie={movie}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default BillBoard;
