"use client";
import useFavourites from "@/hooks/useFavourites";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlay, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  rating: string;
  duration: string;
}

export default function InfoModal({
  visible,
  movie,
  onClose,
}: {
  visible: boolean;
  movie: Movie;
  onClose: () => void;
}) {
  const router = useRouter();

  const { data, isLoading, mutate } = useFavourites();
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderInfo = (info: string) => {
    return (
      <div className="flex flex-row items-center justify-center">
        <p className="text-white text-sm font-semibold">{info}</p>
      </div>
    );
  };

  const isFavourite = (movieId: string) => {
    return !!data.movies.map((movie: Movie) => movie.id).includes(movieId);
  };

  const addFavourite = async (movieId: string) => {
    try {
      await axios.post("/api/add-favourite", {
        movieId,
      });
      toast.success("Added to your list!");
      mutate();
    } catch {
      // onFavouritesChanged();
      toast.error("Unable to add this movie to favourites", {
        position: "bottom-center",
      });
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 bg-black bg-opacity-60 fixed flex flex-col inset-0 items-center justify-center ">
      <div className="w-[60%] md:w-2/5 bg-zinc-800 relative rounded-lg">
        <div className="relative">
          <video
            src={movie.videoUrl}
            autoPlay
            muted
            loop
            className="h-1/2 w-full object-cover rounded-lg brightness-[60%]"
            draggable={false}
          />
          <div
            className="absolute top-4 right-4 bg-zinc-800 bg-opacity-80 z-100 rounded-full p-2 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose className="text-white" />
          </div>
          <div className="absolute flex flex-row bottom-[10%] ml-4 gap-2">
            <button
              className="bg-white lg:min-w-20 px-2 text-xs lg:text-base font-semibold flex items-center gap-2 justify-center rounded-md"
              onClick={() => router.push(`/view/${movie.id}`)}
            >
              <FaPlay className="text-xs" />
              <p>Play</p>
            </button>
            <div
              className="border-2 border-white items-center justify-center p-2 rounded-full ml-2 cursor-pointer"
              onClick={() => {
                addFavourite(movie.id);
              }}
            >
              {isFavourite(movie.id) ? (
                <FaCheck className="text-white" />
              ) : (
                <FaPlus className="text-white" />
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 mb-4 flex flex-col gap-4">
          <p className="text-white text-xl font-semibold">{movie.title}</p>
          <div className="flex flex-row gap-4 items-center">
            {renderInfo(`${movie.rating} Imdb`)}
            {renderInfo(`${movie.genre}`)}
            {renderInfo(`${movie.duration}`)}
          </div>
          <p className="text-white text-sm hidden sm:flex">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}
